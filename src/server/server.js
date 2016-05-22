import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'

import session from 'express-session'
import expressLess from 'express-less'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import flash from 'connect-flash'

import path from 'path'
import util from 'util'

import config from '../../config/server-config.js'
import { users, posts } from './routes'

var logger = require('winston')


function connectToDB(host, port, dbName) {
    try {
        var mongoUrl = util.format("mongodb://%s:%s/%s", host, port, dbName)
        var msg = logger.log('info', "Connecting to database at " + mongoUrl)
        mongoose.connect(mongoUrl); 
    } catch(err) {
        // TODO implement better error handling
        logger.log('error', 'Failed when trying to connect to database at ' + mongoUrl + ' : ' + err)
        throw err
    }
}

connectToDB(config.DB_HOST, config.DB_PORT, config.DB_NAME)
mongoose.Promise = require('bluebird') 

var app = express()
app.use(cookieParser())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

// required for passport
app.use(session({ 
    secret: 'simpleblogey', 
    resave: false, 
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 2419200000 }
}))

app.use(flash()) // use connect-flash for flash messages stored in session
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
// Resources
app.use("/", express.static( __dirname + "/../../public/"));
app.use("/css", expressLess( __dirname + "/../less/", {debug:true}) );


// TODO implement
require('./config/passport')(passport) // configure passport
require('./routes/auth')(app, passport) // mount routes for signin/login auth

// Mount API routers
// TODO remove users routes! They shouldn't be exposed.
// also make sure to instantiate all models before mounting them. (Right now logic is all mingled up)
app.use('/api/users', users) 
app.use('/api/posts', posts)

// Serve HTML
app.get('*', (req, res, next) => {
    console.log('in get *: user ' + req.user)
    res.render(path.resolve(__dirname, '..' , '..', 'views', 'index.ejs'), 
               { main_js: 'main.js', main_css: 'main.css', subdir_url: config.SUBDIR_URL});
});

app.listen( config.APP_PORT , function() { 
    logger.log('info', 'Listening on ' + config.APP_PORT + '...')    
});










