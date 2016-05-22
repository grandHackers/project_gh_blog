import mongoose from 'mongoose';
import User from '../models/user';

export function getUserById(userId, callback) {
    /* Retrieves a information about a user
     * @param {string} userId      id of the user document      
     * @param {function} callback   callback function accepting an error and user document 
     */
    return User.
        findById(userId).
        exec()
}

export function getUserByEmail(email) {
    // TODO comment me!
    // make sure to not give out password    
    return User.
        findOne({email}).
        exec()
}

export function getUserByGoogleId(googleId) {
    // TODO comment me!
    return User.
        findOne({google_id: googleId}).
        exec()
}

export function getUserByUsername(username) {
    // TODO comment me!
    return User.
        findOne({username}).
        exec()
}

export function createUser(email, password, username, firstname, lastname, googleId = undefined) {
    // TODO comment me!
    // TODO May need to add in field for password 
    // if local authentication is to be supported.
    var data = {
        email,
        username,
        first_name: firstname,
        last_name: lastname,
    }
    if (!!googleId) {
        data.googleId = googleId
    } else {
        data.password = password
    }
    
    var user = new User(data)
    return user.save()
}