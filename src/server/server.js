import express from 'express';
import expressLess from 'express-less';
import path from 'path';
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

// Setup DB by
// Importing data into the collections users and posts
var sys = require('sys');
var exec = require('child_process').exec;

var importUserDataCmd = (
    'mongoimport --host ' + dbConfig.host + 
    ' --port ' + dbConfig.port + 
    ' --db ' + dbConfig.db +  
    ' --collection users --drop ' + 
    ' --file ./test-setup/users.json' + 
    ' --jsonArray'
);
exec(importUserDataCmd, function(err, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (err !== null) {
        console.error('exec error: ' + err);
    }        
});

var importPostDataCmd = (
    'mongoimport --host ' + dbConfig.host + 
    ' --port ' + dbConfig.port + 
    ' --db ' + dbConfig.db +      
    ' --collection posts --drop ' + 
    ' --file ./test-setup/posts.json' +
    ' --jsonArray'
);
exec(importPostDataCmd, function(err, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (err !== null) {
        console.error('exec error: ' + err);
    }        
});

// Connect to db remotely - expecting a docker instance
mongoose.connect('mongodb://' + 
    dbConfig.host + ':' +
    dbConfig.port + '/' +
    dbConfig.db);


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

// Serve HTML
app.get('/', (req, res, next) => {
    res.render(path.resolve(__dirname, '..' , '..', 'views', 'index.ejs'), { main_js: 'main.js', main_css: 'main.css'});
});
// Resources
app.use("/", express.static( __dirname + "/../../public/"));
app.use("/css", expressLess( __dirname + "/../less/", {debug:true}) );    
// Mouting routers
app.use('/users', users);
app.use('/posts', posts);


app.listen( config.APP_PORT , function() { 
    console.log('Listening on ' + config.APP_PORT + '...');
});











