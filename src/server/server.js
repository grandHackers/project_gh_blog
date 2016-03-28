import express from 'express';
import expressLess from 'express-less';
import path from 'path';
import config from '../../config/config.js';

import mongoose from 'mongoose';
import users from './routes/user';

// The server is just a simple Express app
var app = express();

// Serve HTML
	// v1
app.get('/', (req, res, next) => {
    res.render(path.resolve(__dirname, '..' , '..', 'views', 'index.ejs'), { main_js: 'main.js', main_css: 'main.css'});
});

// Resources
app.use("/", express.static( __dirname + "/../../public/"));
app.use("/css", expressLess( __dirname + "/../less/", {debug:true}) );

// Connect to db remotely - expecting a docker instance
mongoose.connect('mongodb://mongo/blog');

// API
app.use('/users', users);

app.listen( config.APP_PORT , function() { 
	console.log('Listening on ' + config.APP_PORT + '...');
});

