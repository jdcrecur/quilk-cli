'use strict';

// Import
let authentication = require( 'lib/expressMiddleware/authentication' ),
    router = require('express').Router(),
    controller_user  = require("controllers/api/user");

// lock this group of routes to require authentication
router.use( authentication.isAuthenticated );

// Get the event structure
router.get('/get/current', (req, res) => res.jsonPromise( controller_user.getCurrent(req) ) );

module.exports = router;

