var LocalStrategy   = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var authConfig = require('./auth')

import { getUserById, getUserByEmail, createUser } from '../src/server/api/user'
import mongoose from 'mongoose'
var User = mongoose.model('User')

// TODO Consider getting rid of username and instead verify via email

function getFilteredUserData(user) {
    //console.log('filtering user data')
    //var userObj = Object.assign({}, user)
    var userObj = {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
    }
    return userObj
}

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        //console.log('at serialize with user: ' + user)
        //console.log('userid: ' + user.id)
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        //console.log('at deserialize with id: ' + id)
        getUserById(id, function(err, user) {
            const userData = getFilteredUserData(user)
            ////console.log('after filtering: ' + JSON.stringify(userData))
            done(err, userData);
        });
    });    
    // =========================================================================
    // LOCAL LOGIN + SIGNUP ====================================================
    // =========================================================================
        // TODO take out username from the user
        // instead authenticate using email    
    passport.use(
        'local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
         },
            function(req, username, password, done) {
                const email = username 
                getUserByEmail(email, (err, user) => {
                    if (err) { return done(err) }
                    if (!user) { return done(null, false) }
                    if (!user.verifyPassword(password)) {
                        return done(null, false) 
                    }
                    const userData = getFilteredUserData(user)
                    ////console.log('after filtering: ' + JSON.stringify(userData))
                    return done(null, userData)
                })
            }
        )
    )

    // =========================================================================
    // GOOGLE LOGIN + SIGNUP ===================================================
    // =========================================================================
    const googleAuth = authConfig.google
    passport.use(new GoogleStrategy({
        clientID: googleAuth.clientID,
        clientSecret: googleAuth.clientSecret,
        callbackURL: "http://localhost/auth/google/callback" },
        
        function(accessToken, refreshToken, profile, done) {
            //https://developers.google.com/+/web/api/rest/latest/people#resource-representations
            User.findOrCreate({ google_id: profile.id }, { 
                email: profile.emails[0].value,
                first_name: profile.name.givenName,
                last_name: profile.name.familyName }, 
                function (err, user) {
                    if (err) { return done(err) }
                    return done(null, user)
                })
        }))    
}
