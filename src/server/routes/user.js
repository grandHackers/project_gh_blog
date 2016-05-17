import express from 'express';
import mongoose from 'mongoose';

import { getUserById } from '../api/user';

var router = express.Router();

/*    /users/:id    -- probably shouldn't be available...*/
router.get('/:id', function (req, res, next) {
    var callback = function (err, doc) {
        if (err) {
            console.error(err);
            return next(err);
        }
        res.json(doc);
    }
    getUserById(req.params.id, callback);
});

export default router