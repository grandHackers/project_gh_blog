import mongoose from 'mongoose';
var findOrCreate = require('mongoose-findorcreate')

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        maxlength: 255,
        validate: {
            validator: validateEmail,
            message: '{VALUE} is not a valid email address!',
        },
        required: [true, 'User email address required']
    },
    username: {
        type: String,
        unique: true,        
        minlength: 4,
        required: [true, 'Username required!']
    },
    password: { 
        // TODO need to encrypt the password
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
        // TODO implement validator to check that there's no duplicate google_id (except for null value)
    }
});

function validateEmail(email) {
    // TODO replace with a more reliable email validator
    return /\S+@\S+\.\S+/.test(email);
}

// TODO add validation for unique username
userSchema.plugin(findOrCreate)
var User = mongoose.model('User', userSchema)
export default User
module.exports = User


userSchema.methods.verifyPassword = function(password) {
    // TODO
    // later the password field will be hashed
    // and need to hash the input password and compare against
    // the corresponding hashed password
    return this.password === password
}

userSchema.path('email').validate(function(email, respond) {
    User.find({email: email.toLowerCase()}, function (err, emails) {
        if (err) { console.error('error occurred while checking for email uniqueness...') }
        respond(emails.length === 0)
    }) 
}, "This email has already been registered.")
