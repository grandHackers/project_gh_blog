import LocalPassport from 'passport-local'
import GooglePassport from 'passport-google-oauth'
import authConfig from '../../../config/auth'
import { getUserById, getUserByEmail, getUserByUsername, createUser } from '../api/user'
import { getAvailableUsername } from '../util'
import mongoose from 'mongoose' 
import faker from 'faker'

var LocalStrategy = LocalPassport.Strategy
var GoogleStrategy = GooglePassport.OAuth2Strategy


function getFilteredUserData(user) {
    var userObj = {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
    }
    return userObj
}

function configurePassport(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log('at serialize with user: ' + JSON.stringify(user))
        //console.log('userid: ' + user.id)
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        console.log('at deserialize with id: ' + id)
        getUserById(id).then(user => {
            const userData = getFilteredUserData(user)
            done(null, userData);
        }).catch(err => done(err))
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
                getUserByEmail(email).then((user) => {
                    console.log('authenticating. user: ' + user)
                    if (!user) { return done(null, false) }
                    if (!user.verifyPassword(password)) {
                        return done(null, false) 
                    }
                    const userData = getFilteredUserData(user)
                    ////console.log('after filtering: ' + JSON.stringify(userData))
                    return done(null, userData)
                }).catch(err => { done(err) })
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
        callbackURL: authConfig.google.callbackURL},
        
        function(accessToken, refreshToken, profile, done) {
            //https://developers.google.com/+/web/api/rest/latest/people#resource-representations
            const email = profile.emails[0].value
            const defaultUsername = email.split("@")[0]
            getUserByEmail(email).
                then(user => {
                    if (!!user) { 
                        return done(null, user)
                    } else {
                        return getAvailableUsername(defaultUsername).
                            then(username => createUser(
                                    profile.emails[0].value, 
                                    null, 
                                    username,
                                    profile.name.givenName,
                                    profile.name.familyName,
                                    profile.id)).
                            then((user) => { // if user is created
                                console.log('after createUser') 
                                console.log(user)
                                if (user) { return done(null, user)}      
                            })                                
                    } 
                }).catch(err => {
                    if (err) { return done(err) }  
                })
        }
    ))    
    
}

export default configurePassport