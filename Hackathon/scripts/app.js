'use strict'; //Catch error for sideeffects

//Export express
var express = require('express');
var app = express();

//Export routes
var routes = require('../api/api.routes');

//Use bodypraser
//Multer can even be added to handle file uplaod
var bodyParser = require('body-parser');
var logger = require("morgan");

app.use(logger('dev')); //Log request performed
app.use(bodyParser.json()); //Prase JSON
app.use(bodyParser.urlencoded({
    extended: true
})); //Prase form data


//acess for CORS ( cross browser app)
app.use(function(req, res, next){	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
	if(req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
		return res.status(200).json({});
	}
	next();
});


//Middlewares handle by routes module
app.use('/api/quara', routes);

//catch 404 and foward to error handler
//Syncronous error can be handle by express auto
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Error Handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

//Listening on port 3000
var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('listening on ' + port);
});