'use strict';

let authentication_controller = require('controllers/authentication/authentication_controller');

module.exports = ( app, passport ) => {

    // logout
    app.get('/auth/logout', authentication_controller.logout );

    // process the login form
    app.post('/auth/login', ( req, res, next ) => {

        passport.local_login( req, res, {
            successRedirect : '/',
            failureRedirect : '/login?login=failed',
            failureFlash : true
        }, next );
    });

    // process the signup form
    app.post('/auth/register', authentication_controller.register );
};