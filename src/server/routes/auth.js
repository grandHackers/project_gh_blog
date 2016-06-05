import { createUser } from '../api/user'
import { getAvailableUsername } from '../util'
import config from '../../../config/server-config'
import mongoose from 'mongoose'


export function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) { 
        return next() }
    else {
        res.status(401).json({error: "Not signed in"})    
    }
}

function authenticateSignin(passport, req, res, next) {
    passport.authenticate('local-login', (err, user, info) => {
        console.log(user)
        if (err) { 
            return next(err)
        }
        if (!user) {
            return res.status(401).json({error: info.message})
        }
        if (user) {
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                console.log('Printing req.user: ' + req.user)
                var userDataToSend = Object.assign({}, req.user)
                delete userDataToSend['password']
                console.log('sending user data!' + userDataToSend)
                return res.json(user)
            });
        }          
    })(req, res, next)    
}

function addAuthRoutes(app, passport) {
    app.post('/signin', (req, res, next) => {
        console.log('at /signin')
        authenticateSignin(passport, req, res, next)
    })

    app.post('/signup', (req, res, next) => {
        console.log('at /signup')
        const { email, password, firstname, lastname } = req.body
        const defaultUsername = email.split("@")[0]
        // check if such user exists with the email
        
        getAvailableUsername(defaultUsername)
            .then(username => { 
                console.log("username is: " + username)
                
                return createUser(email.toLowerCase(), password, username, firstname, lastname) 
            })
            .then((err, user) => {
                // why is error object passed as the first argument from createUser promise
                // when it isn't in config/passport.js?
                // TODO add error handling
                console.log('at createUser callback')
                console.log(user)
                authenticateSignin(passport, req, res, next)
            })
            .catch(err => {
                if (err.name === 'ValidationError') {
                    //const error = err.errors
                    // for now just returning one of the errors..
                    var errorMessages = []
                    for (var field in err.errors) {
                        const errMessage = err.errors[field].message
                        console.log(errMessage)
                        errorMessages.push(errMessage)
                    }
                    // just return one error message for now...
                    res.status(401).json({error: errorMessages[0]})
                }
                else {
                    next(err)                    
                }
            })       
    })
                
        
    app.post('/signout', isLoggedIn, function(req, res) {
        // This may instead be handled 
        req.logout()
        req.session.destroy()
        return res.json('logged out')
    })

    app.post('/checkSession', (req, res) => {
        console.log("at /checkSession")
        if (req.isAuthenticated()) {
            // TODO while we know the user is authenticated for the current session
            // can't find where the user data is stored!
            const user = req.user 
            return res.json({ user }) 
        }
    })

    app.get('/auth/google',
    passport.authenticate('google', { scope: 
        [ 'https://www.googleapis.com/auth/plus.login',
          'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
    ))
    
    app.get( '/auth/google/callback', 
        passport.authenticate( 'google', { 
            failureRedirect: '/login_fail' /* TODO implement */ }),
        (req, res) => { res.redirect( config.BASE_URL + '/@' + req.user.username) }
    )
    
}

export default addAuthRoutes