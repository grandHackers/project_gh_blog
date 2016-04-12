var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO research into different ways of storing threaded comment structure

var commentSchema = new Schema({
   owner: {
       type: String,
       required: true
   },
   post_id: {
       type: String,
       required: true
   },
   content: {
       type: String,
       required: true,
       minlength: 1,
       maxlength: 500
    },
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


var Comment = mongoose.model('Comment', commentSchema);

// Checking that owner is the username of an existing user
commentSchema.path('owner').validate( function(username, respond) {
    mongoose.model('User').findOne({ username: username }, function (err, user) {
        respond(!!user);
    });
}, "The username doesn't exist!");

// Check that a post document of post_id exists
commentSchema.path('post_id').validate( function (postId, respond) {
    mongoose.model('Post').findById({ _id: postId }, function (err, post) {
        respond(!!post);
    });
}, "The containing post doesn't exist!");


module.exports = Comment;