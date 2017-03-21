'use strict';

// load all the things we need
let passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    UserModel       = require('database/models/model_user');

// expose this function to our app using module.exports
module.exports = function( app ) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        UserModel.findOneById( user.id ).then(function( user ) {
            done(null, user.id);
        }, function( err ){
            done(err, null);
        });
    });

    
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        UserModel.findOneById( id ).then(function( user ) {
            done(null, user);
        }, function( err ){
            done(err, null);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('login', new LocalStrategy({  passReqToCallback : true  }, function(req, username, password, done) {

        UserModel.findOneByUsername( username ).then(function( user ){

            //now check the password matches
            bcryptLib.comparePassword(password, user.password, function(err, isPasswordMatch) {
                if (err) {
                    //error with bcrypt
                    done(null, false, req.flash('flashMessage', genericFail));
                } else if (isPasswordMatch) {
                    //username and password match, log the user.
                    done(null, user);
                } else {
                    //password missmatch
                    done(null, false, req.flash('flashMessage', genericFail));
                }
            });

        }, function( err ){
            //log the error and do not login
            done(null, false, req.flash('flashMessage', genericFail));
        });
    }));

    // Initializing the passport logic
    app.use(passport.initialize());
    app.use(passport.session());
};