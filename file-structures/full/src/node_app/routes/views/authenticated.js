'use strict';

// Import
let router = require('express').Router(),
    authentication = require('lib/expressMiddleware/authentication');

// Guard the routes below
router.use( authentication.isAuthenticated );

// Get the event structure
router.get('/', (req, res) => {

    //finally load and return the view
    res.render('authenticated/index.njk', {
        data: {
            message: 'Hello world',
            username: req.user.local.email
        }
    });
});


//last but not least, export the router with the new routes
module.exports = router;