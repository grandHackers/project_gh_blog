import express from 'express';
import mongoose from 'mongoose';

import { getPostsByOwner, createPost } from '../api/post';

var router = express.Router()
var logger = require('winston')

// TODO return posts by date (most recent posts should come first)
/*  GET - /posts/:owner */

router.get('/:owner', function(req, res, next) {
    const owner = req.params.owner
    logger.log('info', "Getting posts of owner " + owner)
    getPostsByOwner(owner, function(err, posts) {
        var msg = ""
        if (err) {
            //console.error(err);
            var msg = 'Error when getting posts of owner ' +
                owner + ' : ' + err
            logger.log('error', msg)
            return next(err);
        }
        var msg = 'Success in getting posts by owner ' + owner
        logger.log('info', msg)
        res.json(posts);
    });
});

/*  POST - /posts/owner  */
router.post('/:ownerId', function(req, res, next) {
    const payload = JSON.stringify(req.body)    
    logger.log('info', 'Creating a post ' + payload)
    
    const { ownerId, title, content } = req.body;
    createPost(ownerId, title, content, function(err, post) {
        if (err) {
            logger.log('error', "Error in creating a post " + payload + ' : ' + err)
            return next(err);
        }
        logger.log('info', "Success in creating a post " + payload)
        res.json(post);
    });
});    
    
export default router;