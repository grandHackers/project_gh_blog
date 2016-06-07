import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'
import expressLess from 'express-less'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import flash from 'connect-flash'
import path from 'path'
import connectToDB from './utils/mongoDBConnection'
import config from '../../config/server-config.js'
import configurePassport from './passport'
import addAuthRoutes from './routes/auth'
import { users, posts } from './routes'

connectToDB(config.DB_HOST, config.DB_PORT, config.DB_NAME)
mongoose.Promise = require('bluebird') 

var app = express()
app.use(cookieParser())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

/** 
 * Required for passportjs 
 */ 
app.use(session({ 
    secret: 'simpleblogey', 
    resave: false, 
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 2419200000 }
}))

app.use(flash()) // use connect-flash for flash messages stored in session
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use("/", express.static( __dirname + "/../../public/"));
app.use("/css", expressLess( __dirname + "/../less/", {debug:true}) );

configurePassport(passport)
addAuthRoutes(app, passport)

/** 
 * Mount API routers 
 */ 
app.use('/api/users', users) 
app.use('/api/posts', posts)

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.json({error: err.message})
}

app.use(errorHandler)

// Serve HTML
app.get('*', (req, res, next) => {
    console.log('in get *: user ' + req.user)
    res.render(path.resolve(__dirname, '..' , '..', 'views', 'index.ejs'), 
               { main_js: 'main.js', main_css: 'main.css', base_url: config.BASE_URL});
});

app.listen( config.APP_PORT , function() { 
    console.log('Listening on ' + config.APP_PORT + '...')    
});










