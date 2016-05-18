var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    owner_id: { 
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
postSchema.path('owner_id').validate( function (ownerId, respond) {
    mongoose.model('User').findById(ownerId, function (err, user) {
        respond(!!user);
    });
}, "No such owner exists!");


module.exports = mongoose.model('Post', postSchema)