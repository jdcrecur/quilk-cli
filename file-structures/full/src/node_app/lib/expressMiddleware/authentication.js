"use strict";
let routes_config = require('routes.config.json');

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
            console.log('0000000');
            return next();
        } else {
            console.log( req );
            console.log( routes_config.authenticated_redirect );
            //they are logged in, take them to /wish/ as this is where they should be for react to kick in
            return res.redirect( routes_config.authenticated_redirect);
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
            if( String(req.headers['x-requested-with']) === 'XMLHttpRequest' ){
                return res.status(401).send('Who you are you?');
            } else {
                //they are not logged in so just continue to the "next" function
                return res.redirect( routes_config.unauthenticated_redirect );
            }
        }
    }
};