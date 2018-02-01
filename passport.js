var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var configAuth = require('./auth');
var passport = require('passport');
var user = 
module.exports = function(passport){
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
   
        done(null, user);
   
});
passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

    }, function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

                    
                   
			console.log( profile.displayName); 
			return done(null,profile.displayName);
                   
		});
	}
));
}
