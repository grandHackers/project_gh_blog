import { createUser } from '../api/user'
import { getAvailableUsername } from '../util'
import config from '../../../config/server-config'

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
        if (err) { return next(err); }
        if (!user) { return res.status(401).json(info); }
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
        getAvailableUsername(defaultUsername).
            then(username => { 
                console.log("username is: " + username)
                return createUser(email, password, username, firstname, lastname) }).
            then((err, user) => {
                // err handling done in the following catch statement....?
                console.log('at createUser callback')
                console.log(user)
                authenticateSignin(passport, req, res, next)
            }).
            catch(err => { next(err) })       
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