"use strict";
let jsonfile = require('jsonfile'),
    auth = require('http-auth'),
    bcrypt = require('bcrypt-nodejs');

module.exports = {

    /**
     * Ensures the user is NOT authenticated
     *
     * ! Requires passport to be setup
     *
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    notAuthenticated: (req, res, next) => {
        //they are not logged in so just continue to the "next" function
        if (!req.isAuthenticated()) {
            return next();
        } else {
            //they are logged in, take them to /wish/ as this is where they should be for react to kick in
            return res.redirect('/admin/');
        }
    },

    /**
     * Ensures the user is authenticated
     *
     * ! Requires passport to be setup
     *
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    isAuthenticated: (req, res, next) => {
        //they are logged in, take them to /wish/ as this is where they should be for react to kick in
        if (req.isAuthenticated()) {
            return next();
        } else {
            //if json request then this is a timeout from within the app, send 401 amd let angular handle the redirect
            if( req.headers['x-requested-with'] == 'XMLHttpRequest' ){
                return res.status(401).send('Who you are you?');
            } else {
                //they are not logged in so just continue to the "next" function
                return res.redirect('/');
            }
        }
    },

    /**
     * Basic authentication
     *
     * @param req
     * @param res
     * @param next
     */
    basicAuthentication: ( req, res, next ) => {
        let basic = auth.basic({
                realm: "BASIC AUTHENTICATION REQUIRED"
            }, function (username, password, callback) {
                jsonfile.readFile( process.cwd() + '/config/auth.json', (err, auth) => {

                    if( err ) return callback( false );
                    if( !auth.users[username] ) return callback(false);

                    bcrypt.compare( password, auth.users[username], (err, res) => {
                        if( err || !res) return callback(false);
                        return callback( true );
                    });
                });
            }
        );

        // Last auth check.. basic authentication
        basic.check(req, res, (req, res, err) => {
            if (err) next(err);
            else next();
        });
    }
};