'use strict';

// Import
let authentication = require( 'lib/expressMiddleware/authentication' ),
    controller_messages  = require("controllers/controller_messages"),
    router = require('express').Router();

// lock this group of routes to require authentication
router.use( authentication.basicAuthentication );


// Get the event structure
router.get('/get/all', (req, res) => res.jsonPromise( controller_messages.getMessages( ) ) );

module.exports = router;

