var express = require('express');
require('dotenv').config()
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var auctions = require('./routes/auctions');
var bids = require('./routes/bids');
// for development purpose only
var fakeRoute = require('./routes/fake/');

var app = express();

// call socket.io to the app
app.io = require('socket.io')();


global.io = app.io;

// start listen with socket.io
app.io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('new message', function(msg){
    console.log('new message: ' + msg);
    socket.broadcast.emit('chat message', msg);
    socket.emit('chat message', msg);
  });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);
app.use('/auctions/', auctions);
app.use('/bids/', bids);
app.use('/fake/', fakeRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
