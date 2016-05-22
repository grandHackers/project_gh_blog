import express from 'express';
import mongoose from 'mongoose';
import { getUserByUsername } from '../api/user'
import { 
    getPostById, 
    getPostsByOwnerId, 
    createPost, 
    editPost } from '../api/post';

var router = express.Router()
var logger = require('winston')

function getFilteredPostData(post, owner) {
    // take out owner_id field with
    // owner (username) instead
    console.log(owner)
    const handledPostData = {
        title: post.title,
        content: post.content, 
        created_at: post.created_at,
        updated_at: post.updated_at,
        owner,        
    }
    return handledPostData
}

router.get('/', (req, res, next) => {
    // do I have users?
    // /posts?owner=erikay
    console.log('GET on /posts')
    const owner = req.query.owner
    if (!!owner) {
        getUserByUsername(owner).
            then(user => getPostsByOwnerId(user._id)).
            then(posts => {
                const processedPosts = posts.map(
                    data => getFilteredPostData(data, owner))
                res.json(processedPosts) 
            }).
            catch(err => { next(err) })
    }
})

router.post('/', (req, res, next) => {
    // only allow creation of a post if user is logged in
    console.log('POST on /posts ')
    if (!req.isAuthenticated()) {
        res.json("user is not logged in. cannot create post")
    } else {
        const user = req.user
        const { title, content } = req.body;
        createPost(user.id, title, content).
            then(post => {
                const processedPost = getFilteredPostData(post, user.username)
                res.json(processedPost)
            }).
            catch(err => next(err))
    }
})


//Uncomment and Implement me
// for getting post details
/*
router.get('/:postId', (req, res, next) => {
    console.log("Getting Post Details")
})*/

// edit a post
router.post('/:postId', (req, res, next) => {
    console.log("Editing a post")
    if (!req.isAuthenticated()) {
        // TODO respond with better error message to the client
        res.status(401).json({
            error: "user not logged in" })
    } else {
        const postId = req.params.postId
        const { title, content } = req.body

        getPostById(postId).
            then(post => { 
                if (post.userId != req.user.id) {
                    return res.status(403).json({
                        error: "The user is not the owner of the post. Request denied"
                    })                    
                } else {
                    return editPost(postId, title, content).
                        then(post => {
                            const processedPost = getFilteredPostData(post, user.username)
                            res.json(processedPost)                            
                        })
                }
            }).
            catch(err => next(err))
    }
})



export default router;