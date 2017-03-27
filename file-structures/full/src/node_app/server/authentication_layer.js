'use strict';

// load all the things we need
let passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    auth_controller = require('controllers/authentication/authentication_controller');

// expose this function to our app using module.exports
module.exports = function( app, cb ) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        auth_controller.serializeUser( user, done );
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        auth_controller.deserializeUser( id, done );
    });

    // Wrapper for the local authentication.
    passport.local_login = ( req, res, options, next) => {
        passport.authenticate('local-login', options)(req, res, next);
    };

    // Local login method
    passport.use('local-login', new LocalStrategy(
        require( 'authentication.config.json' )['localLoginStrategyOptions'],
        function(req, username, password, done){
            auth_controller.login(req, username, password, done);
    }) );

    // Initializing the passport logic
    app.use(passport.initialize());
    app.use(passport.session());

    cb( passport );
};