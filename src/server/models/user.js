import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        minlength: 4,
        maxlength: 12,
        required: [true, 'Username required!']
    },
    password: { // TODO need to encrypt the password
        type: String, 
        minlength: 4,
        maxlength: 128,
        required: [true, 'User password required!']   
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
    email: {
        type: String,
        maxlength: 255,
        validate: {
            validator: validateEmail,
            message: '{VALUE} is not a valid email address!'
        },
        required: [true, 'User email address required']
    }
});

function validateEmail(email) {
    // TODO replace with a more reliable email validator
    return /\S+@\S+\.\S+/.test(email);
}


var User = mongoose.model('User', userSchema);
export default User;
module.exports = User;
  