import express from 'express';
import mongoose from 'mongoose';
import { isLoggedIn } from './auth'
import { getUserById, getUserByUsername, editUsername } from '../api/user';

var router = express.Router();

function isAuthorized(req, res, next) {
    // assuming user is already logged in
    if (req.params.id === req.user.id) {
        return next()
    } else {
        res.status(403).json({
            error: "User is not authorized to access another user's information"
        })  
    } 
}

router.head('/', function(req, res, next) {
    // support querying by username
    console.log('HEAD at /users!')
    if (!!req.query.username) {
        const username = req.query.username
        getUserByUsername(username)
            .then((user, err) => {
                if (err) {
                    console.err(err)
                    next(err)
                }
                if (!user) {
                    res.sendStatus(404)
                } else {
                    res.sendStatus(200)
                }
            }) 
    }
})


/*    /users/:id    -- probably shouldn't be available...
if it's available, it should only be available to the owner 
*/
router.get('/:id', isLoggedIn, isAuthorized, function (req, res, next) {
    getUserById(req.params.id)
        .then(user => {
            if (!!user) {
                res.status(200).json(user)
            } else {
                res.status(404).json("No such user exists")
            }
        })
        .catch(err => { next(err) })
})

router.put('/:id', isLoggedIn, isAuthorized, function(req, res, next) {
    const { username } = req.body
    if (!!username) {
        editUsername(req.params.id, username)
            .then(user => {
                if (!!user) {
                    // update session username accordingly
                    req.user.username = user.username
                    console.log('updated user: ' + user)
                    res.status(200).json(user)
                } else {
                    const message = "Errr not getting user resource back after edit" 
                    console.error(message)
                    res.sendStatus(500)
                }
            })
            .catch(err => {
                console.error(err)
                next(err)
            })
    }
    // More edit options to come...
})

export default router