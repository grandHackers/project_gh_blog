var LocalStrategy   = require('passport-local').Strategy;
import { getUserByUsername, createUser } from '../src/server/api/user'

// TODO Consider getting rid of username and instead verify via email

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log('at serialize')
        done(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log('at deserialize')
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });    
    // =========================================================================
    // LOCAL LOGIN + SIGNUP ====================================================
    // =========================================================================
    passport.use(
        'local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
         },
            function(req, username, password, done) {
                console.log('at passport use!')
                getUserByUsername(username, (err, user) => {
                    if (err) { return done(err) }
                    if (!user) { return done(null, false) }
                    if (!user.verifyPassword(password)) {
                        return done(null, false) 
                    }
                    return done(null, user)
                })
            }, function(e) { 
                console.log('error!')
                return done(null, false, {message: 'Incorrect credentials!'})
            }
        )
    )
    
    passport.use(
        'local-signup', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
         },
            function(req, username, password, done) {
                console.log('passport local sign-up')
                const firstname = req.body.firstname
                const lastname = req.body.lastname
                const email = req.body.email
                //console.log(username)
                //console.log(password)                
                //console.log(firstname)
                //console.log(lastname)
                //console.log(email)
                createUser(username, password, email, firstname, lastname, (err, user) => {
                    // assuming all validation is done at schema level 
                    // TODO need to handle error messages
                    console.log('at createUser')
                    if (err) { return done(err) }
                    return done(null, user)
                })
            }
        )
    )
    
}
