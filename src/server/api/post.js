import mongoose from 'mongoose';
import Post from '../models/post';

export function getPostById(postId) {
    /* Retrieves a information about a post
     * @param {string} postId      id of the post document      
     * 
     */
    return Post.
        findById(postId).
        exec()
}

export function getPostsByOwnerId(ownerId) {
    return Post
        .find({ owner_id: ownerId })
        .sort({ 'updated_at': -1, 'created_at': -1, })
        .exec()
}

export function createPost(ownerId, title, content) {
    /* Creates a new post document. 
     * @param {string} owner        username of the user who is making the post      
     * @param {string} title        title of the post
     * @param {string} content      content of the post 
     * 
     */    
    var data = { owner_id: ownerId, title, content }
    var post = new Post(data);
    return post.save()
}

export function editPost(postId, title, content) {
    return getPostById(postId).
        then(post => {
            post.title = title
            post.content = content
            return post.save()
        })
}

export function deletePost(postId) {
    return Post
        .remove({_id: postId})
        .exec()
}