'use strict';

let authentication_controller = require('controllers/authentication/authentication');

module.exports = ( app, passport ) => {

    // logout
    app.get('/auth/logout', authentication_controller.logout );

    // process the login form
    app.post('/auth/login', ( req, res, next ) => {
        passport.local_login( req, res, {
            successRedirect : '/app',
            failureRedirect : '/',
            failureFlash : true
        }, next );
    });

    // process the signup form
    app.post('/auth/register', authentication_controller.register );
};
