import express from 'express';
import mongoose from 'mongoose';

import { getUserById } from '../api/user';
import { respondWithData } from '../util'

var router = express.Router();

/*    /users/:id    -- probably shouldn't be available...*/
router.get('/:id', function (req, res, next) {
    getUserById(req.params.id).
        then(respondWithData)
});


export default router