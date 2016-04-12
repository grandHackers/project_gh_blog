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
   parent_id: {
       type: String
    } 
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


var Comment = mongoose.model('Comment', commentSchema);

// Checking that owner is the username of an existing user
commentSchema.path('owner').validate( function(username, respond) {
    mongoose.model('User').findOne({ username: username }, function (err, user) {
        respond(!!user);
    });
}, "The username doesn't exist!");

// Checking that comment with parent_id exists
commentSchema.path('parent_id').validate( function (parentId, respond) {
    Comment.findById({ _id: parentId }, function (err, comment) {
        // TODO need to also check that post_id of the parent_id 
        // is the same
        respond(!!comment);
    });     
}, "The parent comment doesn't exist!");

// Check that a post document of post_id exists
commentSchema.path('post_id').validate( function (postId, respond) {
    mongoose.model('Post').findById({ _id: postId }, function (err, post) {
        respond(!!post);
    });
}, "The containing post doesn't exist!");


module.exports = Comment;