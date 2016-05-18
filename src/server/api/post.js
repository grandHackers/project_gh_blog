import mongoose from 'mongoose';
import Post from '../models/post';

export function getPostById(postId, callback) {
    /* Retrieves a information about a post
     * @param {string} postId      id of the post document      
     * @param {function} callback   callback function accepting an error and post document 
     */
    return Post.findById(postId, callback);
}

export function getPostsByOwner(ownerId, callback) {
    return Post.
        find({ owner_id: ownerId }).
        sort('-created_at').
        exec(callback)
}

export function createPost(ownerId, title, content, callback) {
    /* Creates a new post document. 
     * @param {string} owner        username of the user who is making the post      
     * @param {string} title        title of the post
     * @param {string} content      content of the post 
     * @param {function} callback   callback function accepting an error and a post document 
     */    
    var data = { owner_id: ownerId, title, content }
    var post = new Post(data);
    post.save(function(err) {
        callback(err, post);
    });
}