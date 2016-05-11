import express from 'express'
import expressLess from 'express-less'
import bodyParser from 'body-parser'
import path from 'path'
import util from 'util'
import mongoose from 'mongoose'

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


var app = express()
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Resources
app.use("/", express.static( __dirname + "/../../public/"));
app.use("/css", expressLess( __dirname + "/../less/", {debug:true}) );

// Mount routers (API)
app.use('/api/users', users);
app.use('/api/posts', posts);

// Serve HTML
app.get('*', (req, res, next) => {
    res.render(path.resolve(__dirname, '..' , '..', 'views', 'index.ejs'), 
               { main_js: 'main.js', main_css: 'main.css', subdir_url: config.SUBDIR_URL});
});

app.listen( config.APP_PORT , function() { 
    logger.log('info', 'Listening on ' + config.APP_PORT + '...')    
});










