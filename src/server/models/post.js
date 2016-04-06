var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    owner: { // username of the author
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 55
    },
    content: {
        type: String,
        required: true,
        maxlength: 1200
    }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Checking username is correct
postSchema.path('owner').validate( function (username, respond) {
    mongoose.model('User').findOne({ username: username }, function (err, user) {
        respond(!!user);
    });
}, "The username doesn't exist!");


module.exports = mongoose.model('Post', postSchema)