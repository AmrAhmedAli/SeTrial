var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cassandra = require('cassandra-driver');
var index = require('./routes/index');
var posts = require('./routes/posts');
var addP = require('./routes/addP');
var engines = require('consolidate');
var passport = require('passport');
var session = require('express-session');

var app = express();




app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
require('./passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


    app.get('/auth/facebook', passport.authenticate('facebook', { 
      scope : ['public_profile', 'email']
    }));


    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/posts',
            failureRedirect : '/posts'
        }));
app.use('/', index);
app.use('/posts', posts);
app.use('/add', addP);

module.exports = app;
