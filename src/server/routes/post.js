import express from 'express';
import mongoose from 'mongoose';
import { getUserByUsername } from '../api/user'
import { 
    getPostById, 
    getPostsByOwnerId, 
    createPost, 
    editPost,
    deletePost
 } from '../api/post';
import { isLoggedIn } from './auth'
var router = express.Router()

function isAuthorized(req, res, next) {
    console.log('inside isAuthorized for post access')
    
    const postId = req.params.postId
    const postOwner = getPostById(postId)
        .then(post => {
            if (post.owner_id !== req.user.id) {
                return res.status(403).json({
                    error: "The user is not the owner of the post. Request denied"
                })                    
            } else {
                next()
            } 
        })
        .catch(error => next(error))
}

function getFilteredPostData(post, owner) {
    // take out owner_id field with
    // owner (username) instead
    const handledPostData = {
        id: post._id,
        title: post.title,
        content: post.content, 
        created_at: post.created_at,
        updated_at: post.updated_at,
        owner,        
    }
    return handledPostData
}

router.get('/', (req, res, next) => {
    // querying posts by owner (username)
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
        createPost(user.id, title, content)
            .then(post => {
                const processedPost = getFilteredPostData(post, user.username)
                res.json(processedPost)
            })
            .catch(err => next(err))
    }
})


router.put('/:postId', isLoggedIn, isAuthorized, (req, res, next) => {
    const postId = req.params.postId
    const { title, content } = req.body

    return editPost(postId, title, content)
        .then(post => {
            const processedPost = getFilteredPostData(
                post, req.user.username)
            res.status(200).json(processedPost)                            
        })
        .catch(err => next(err))
})


router.delete('/:postId', isLoggedIn, isAuthorized, (req, res, next) => {
    const postId = req.params.postId
    return deletePost(postId)
        .then(
            () => res.status(200).json({}),
            (err) => {
                // consider checking if this is performed on an existing post first
                // in the api helper function
                console.log(`delete Post ${postId} unsuccessful`)
                res.status(500).json({error: "delete post is unsuccessful for some reason"})
            }
        )
        .catch(err => next(err))
})

export default router;