'use strict';

// Import
let router = require('express').Router();

// Get the event structure
router.get('/', (req, res) => {
    //finally load and return the view
    res.render('public/index.njk', {
        data: {
            'message': 'Hello world, you have just authenticated, great work!'
        }
    });
});

module.exports = router;