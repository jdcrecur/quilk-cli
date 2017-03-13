'use strict';

module.exports = ( app ) => {

    /**
     * Base/ index route.. renders the index nunjucks
     */
    app.get('/', (req, res) => {
        //finally load and return the view
        res.render('public/index.njk', {
            data: {
                'message': 'Hello world'
            }
        });
    });
};