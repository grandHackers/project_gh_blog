import express from 'express';
import expressLess from 'express-less';
import path from 'path';
import config from '../../config/config.js';

import mongoose from 'mongoose';
import { users, posts } from './routes'

// Setup DB by
// Importing data into the collections users and posts
var sys = require('sys');
var exec = require('child_process').exec;

var mongoConfig = { 
    host: 'localhost', 
    port: '27017',
    db: 'blog'
 };

var importUserDataCmd = (
    'mongoimport --host ' + mongoConfig.host + 
    ' --port ' + mongoConfig.port + 
    ' --db ' + mongoConfig.db +  
    ' --collection users --drop ' + 
    ' --file ./config/users.json' + 
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
    'mongoimport --host ' + mongoConfig.host + 
    ' --port ' + mongoConfig.port + 
    ' --db ' + mongoConfig.db +      
    ' --collection posts --drop ' + 
    ' --file ./config/posts.json' +
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
    mongoConfig.host + ':' +
    mongoConfig.port + '/' +
    mongoConfig.db);


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
// mouting routers
app.use('/users', users);
app.use('/posts', posts);



app.listen( config.APP_PORT , function() { 
    console.log('Listening on ' + config.APP_PORT + '...');
});











