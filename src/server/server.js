import express from 'express'
import expressLess from 'express-less'
import bodyParser from 'body-parser'
import path from 'path'
import util from 'util'
var winston = require('winston')
import mongoose from 'mongoose'

import config from '../../config/config.js'
import configureLogger from './log.js'
import { users, posts } from './routes'

// TODO remove this once db-address is instead coming from config file
// Allow user to specify the host and port of mongod
// ex: node server.js --db-path <localhost:27017>
var commandLineArgs = require('command-line-args');
var cli = commandLineArgs([
    { name: 'db-address', alias:'d', type: String, defaultValue: 'localhost:27017'}
])
var options = cli.parse()

var dbAddress = options['db-address'].split(':');
var dbConfig = { 
    host: dbAddress[0], 
    port: dbAddress.length > 1 ? dbAddress[1] : '27017',
    db: 'blog'
 };

 
//console.log(config)
var logger = winston

function connectToDB(dbConfig) {
    // assume logger is globally available
    try {
        var mongoUrl = util.format("mongodb://%s:%s/%s", dbConfig.host, dbConfig.port, dbConfig.db);
        var msg = logger.log('info', "Connecting to database at " + mongoUrl)
        mongoose.connect(mongoUrl); 
    } catch(err) {
        // TODO implement better error handling
        logger.log('error', 'Failed when trying to connect to database at ' + mongoUrl + ' : ' + err)
        throw err
    }
}

configureLogger(config)
    .then(() => connectToDB(dbConfig))
    .catch(err => console.log(err))


var app = express()

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Serve HTML
app.get('/', (req, res, next) => {
    res.render(path.resolve(__dirname, '..' , '..', 'views', 'index.ejs'), { main_js: 'main.js', main_css: 'main.css'});
});
// Resources
app.use("/", express.static( __dirname + "/../../public/"));
app.use("/css", expressLess( __dirname + "/../less/", {debug:true}) );
    
// Mount routers
app.use('/users', users);
app.use('/posts', posts);

app.listen( config.APP_PORT , function() { 
    logger.log('info', 'Listening on ' + config.APP_PORT + '...')    
});










