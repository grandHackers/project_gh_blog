import mongoose from 'mongoose';
import User from '../models/user';
// var User = require('../models/user');
// var User = mongoose.model('User');

export function getUser(userId, callback) {
    /* Retrieves a information about a user
     * @param {string} userId      id of the user document      
     * @param {function} callback   callback function accepting an error and user document 
     */
    return User.findById(userId, callback);
}