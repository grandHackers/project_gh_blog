import mongoose from 'mongoose';
import User from '../models/user';

export function getUserById(userId, callback) {
    /* Retrieves a information about a user
     * @param {string} userId      id of the user document      
     * @param {function} callback   callback function accepting an error and user document 
     */
    return User.findById(userId, callback);
}

export function getUserByUsername(username, callback) {
    // TODO comment me!
    // make sure to not give out password
    return User.findOne({username}, callback)
}


export function createUser(username, password, email, firstname, lastname, callback) {
    // TODO comment me!
    // TODO May need to add in field for password 
    // if local authentication is to be supported.
    var data = {
        username,
        password,
        email,
        first_name: firstname,
        last_name: lastname,

    };
    var user = new User(data)
    user.save(function(err) {
        callback(err, user);
    });
}