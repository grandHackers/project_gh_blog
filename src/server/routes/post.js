import express from 'express';
import mongoose from 'mongoose';

import Post from '../models/post';
var router = express.Router();

/*  /posts/:username */
router.get('/:username', function(req, res, next) {
    Post.find({username: req.params.username}, function(err, posts) {
        if (err) {
            console.error(err);
            return next(err);
        }
        res.json(posts);
    });
});

export default router;