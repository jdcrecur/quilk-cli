'use strict';

// Import
let router = require('express').Router(),
    authentication = require('lib/expressMiddleware/authentication');

// The login view
router.get('/', authentication.notAuthenticated, (req, res) => {
    //finally load and return the view
    res.render('public/index.njk', {
        data: {
            message: 'Please log in to continue.',
            error: (req.flash('errors').length > 0)
        }
    });
});

// The register view
router.get('/register', authentication.notAuthenticated, (req, res) => {
    res.render('public/register.njk', {
        data: {
            message: 'Enter a username and password to create an account.',
            error: (req.flash('errors').length > 0)
        }
    });
});

module.exports = router;