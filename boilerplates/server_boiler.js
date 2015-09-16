#!/usr/bin/env node
var browserify = require('browserify');
var watchify = require('watchify');
var path = require('path');
var express = require('express');
var app = module.exports = express(), errorHandler;
var server = require('http').createServer(app);
var AppError = require('./error').AppError;
var bodyParser = require('body-parser');
app.set('trust proxy', true);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(require('cookie-parser')());
app.use(require('morgan')('dev'));
app.use((errorHandler = require('errorhandler')(), errorHandler));
app.use(require('./http_error'));
// var passport = require('passport'), auth = require('./app/auth/strategy')(passport);
// app.use('/', require('./routes')(express, passport));
var fs = require('fs');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var chalk = require('chalk');

var b = browserify(path.resolve('./src/index.js'), watchify.args);
var w = watchify(b);

var bytes, time;
w.on('bytes', function (b) { bytes = b });
w.on('time', function (t) { time = t });

var update = function(bundle) {
    var didError = false;
    var writeStream = fs.createWriteStream(path.resolve('./public/bundle.js'));

    bundle.on('error', function (err) {
        console.error(String(chalk.red(err)));
        didError = true;
        writeStream.end();
    });

    bundle.pipe(writeStream);

    writeStream.on('error', function (err) {
        console.error(chalk.red(err));
    });

    writeStream.on('close', function () {
        if (!didError) {
            console.error(chalk.cyan(bytes) + chalk.grey(' bytes written to ') + chalk.cyan(path.resolve('./public/bundle.js'))
                + ' (' + (time / 1000).toFixed(2) + ' seconds)'
            );
        }
    });
}

update(w.bundle());

w.on('update', function (ids) {
    update(w.bundle());
});

var serve = serveStatic(path.normalize('./public/'));

app.use(function(req, res) {
    serve(req, res, finalhandler(req, res))
});

app.use(function(err, req, res, next) {
  if (typeof err === 'number') {
    err = new AppError(err);
  }
  if (err instanceof AppError) {
    res.sendHttpError(err);
  } else {
    if (app.get('env') === 'development') {
      errorHandler(err, req, res, next);
    } else {
      res.sendHttpError(new AppError(500));
    }
  }
});

app.use(function(req, res){
  return res.sendfile(__dirname + '/public/404.html');
});

var port = process.env.PORT || 1618;
var ipaddr = process.env.IP || 'localhost';
server.listen(port, ipaddr, function() {
  console.log(chalk.grey('serving ') + chalk.blue(path.resolve('./public/')) + chalk.grey(' on port ') + chalk.blue(port));
});