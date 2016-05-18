import { createUser } from '../api/user'

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) { return next() }
    res.json({error: "Not signed in"})
}

// TODO refactor 
function authenticateSignin(passport, req, res, next) {
    passport.authenticate('local-login', (err, user, info) => {
        console.log(user)
        if (err) { return next(err); }
        if (!user) { return res.json(info); }
        if (user) {
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                console.log('Printing req.user: ' + req.user)
                console.log('sending user data!')
                return res.json(user)
            });
        }          
    })(req, res, next)    
}

module.exports = function(app, passport) {
    app.post('/signin', (req, res, next) => {
        console.log('at /signin')
        authenticateSignin(passport, req, res, next)
    })

    app.post('/signup', (req, res, next) => {
        console.log('at /signup')
        const { email, password, firstname, lastname } = req.body
        
        createUser(email, password, firstname, lastname, (err, user) => {
            // assuming all validation is done at schema level 
            // TODO need to handle error messages
            console.log('at createUser callback')
            if (err) { return next(err) }
            authenticateSignin(passport, req, res, next)
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
        if (isLoggedIn) {
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
            successRedirect: '/',
            failureRedirect: '/login_fail' // TODO implement
    }))
    
}