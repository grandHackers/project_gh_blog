import assert from 'assert';
import mongoose from 'mongoose';

export default function populateDB() {
    // populate with dummy data
    var User = mongoose.model('User');
    User.remove({}, function(err) {
        console.log('All users removed.');
        var usersData = require("./users.json");
        User.collection.insertMany(usersData, function(err, resp) {
            assert.equal(null, err);
            assert.equal(usersData.length, resp.insertedCount);
            console.log("Populated the 'users' collection.");
        });        
    });
    
    var Post = mongoose.model('Post');
    Post.remove({}, function(err) {
        console.log('All posts removed.');
        var postsData = require('./posts.json');
        Post.collection.insertMany(postsData, function(err, resp) {
            assert.equal(null, err);
            assert.equal(postsData.length, resp.insertedCount);
            console.log("Populated the 'posts' collection.")
        });        
    });

}