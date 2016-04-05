import express from 'express';
import mongoose from 'mongoose';

import { getPostsByOwner, createPost } from '../api/post';

var router = express.Router();

/*  GET - /posts/:owner */
router.get('/:owner', function(req, res, next) {
    getPostsByOwner(req.params.owner, function(err, posts) {
        if (err) {
            console.error(err);
            return next(err);
        }
        res.json(posts);
    });
});

/*  POST - /posts/owner  */
router.post('/:owner', function(req, res, next) {
    console.log('printing request body');
    console.log(req.body);
    const { owner, title, content } = req.body;
    createPost(owner, title, content, function(err, post) {
        if (err) {
            console.error(err);
            return next(err);
        }
        res.json(post);
    });
});    
    
export default router;