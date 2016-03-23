import express from 'express';
import mongoose from 'mongoose';

import { getUser } from '../api/user';

var router = express.Router();

/*    /users/:id    */
router.get('/:id', function (req, res, next) {
    var callback = function (err, doc) {
        if (err) {
            console.error(err);
            return next(err);
        }
        res.json(doc);
    }
    getUser(req.params.id, callback);
});

export default router;