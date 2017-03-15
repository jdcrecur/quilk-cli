'use strict';

// load all the things we need
let LocalStrategy   = require('passport-local').Strategy,
    modelUser 		= require('database/models/model_user'),
    bcryptLib       = require('lib/bcrypt_lib');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        modelUser.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('login', new LocalStrategy({  passReqToCallback : true  }, function(req, username, password, done) {

        let genericFail = 'Wrong username or password';

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
};