import express from 'express';
import expressLess from 'express-less';
import bodyParser from 'body-parser';

import path from 'path';
import util from 'util';
import config from '../../config/config.js';

import mongoose from 'mongoose';
import { users, posts } from './routes'


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

// Connect to db remotely - expecting a docker instance
try {
    var mongoUrl = util.format("mongodb://%s:%s/%s", dbConfig.host, dbConfig.port, dbConfig.db);
    console.log(mongoUrl);
    mongoose.connect(mongoUrl); 
} catch(err) {
    // TODO implement better error handling
    console.log(err);
    throw err;
}

var app = express();

/*
// enable all CORS requests
var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();      
    }
}
app.use(allowCrossDomain); */

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
    console.log('Listening on ' + config.APP_PORT + '...');
});











