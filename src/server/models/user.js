import mongoose from 'mongoose';
var findOrCreate = require('mongoose-findorcreate')

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        maxlength: 255,
        validate: {
            validator: validateEmail,
            message: '{VALUE} is not a valid email address!'
        },
        required: [true, 'User email address required']
    },    
    password: { // TODO need to encrypt the password
        // password only required if google_id field is empty
        type: String, 
        minlength: 4,
        maxlength: 128, 
    },
    first_name: {
        type: String,
        maxlength: 35,
        required: [true, 'User first name required!']
    },
    last_name: {
        type: String,
        maxlength: 35,
        required: [true, 'User last name required!']
    },
    google_id: {
        type: String
    }
});

function validateEmail(email) {
    // TODO replace with a more reliable email validator
    return /\S+@\S+\.\S+/.test(email);
}

userSchema.methods.verifyPassword = function(password) {
    // TODO
    // later the password field will be hashed
    // and need to hash the input password and compare against
    // the corresponding hashed password
    return this.password === password
}

// TODO add validation for unique username
userSchema.plugin(findOrCreate)
var User = mongoose.model('User', userSchema)
export default User;
module.exports = User;
  