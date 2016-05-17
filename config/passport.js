var LocalStrategy   = require('passport-local').Strategy;
import { getUserById, getUserByUsername, createUser } from '../src/server/api/user'

// TODO Consider getting rid of username and instead verify via email

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log('at serialize with user: ' + user)
        console.log('userid: ' + user.id)
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        console.log('at deserialize with id: ' + id)
        getUserById(id, function(err, user) {
            console.log('user: ' + user)
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
                getUserByUsername(username, (err, user) => {
                    if (err) { return done(err) }
                    if (!user) { return done(null, false) }
                    if (!user.verifyPassword(password)) {
                        return done(null, false) 
                    }
                    return done(null, user)
                })
            }
        )
    )
    
    
}
