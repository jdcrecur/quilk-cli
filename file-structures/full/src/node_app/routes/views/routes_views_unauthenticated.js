'use strict';

// Import
let router = require('express').Router();

// The login view
router.get('/', (req, res) => {
    //finally load and return the view
    res.render('public/index.njk', {
        data: {
            message: 'Please log in to continue.',
            error: (req.flash('errors').length > 0)
        }
    });
});

// The register view
router.get('/register', (req, res) => {
    res.render('public/register.njk', {
        data: {
            message: 'Enter a username and password to create an account.',
            error: (req.flash('errors').length > 0)
        }
    });
});

module.exports = router;