/**
 * Express middleware to control the http headers
 * @returns {Function}
 */
module.exports = () => {
    return (req, res, next) => {
        res.status(404);
        // respond with html page
        if (req.accepts('html')) {
            //res.render('public/404.njk', { url: req.url });
            res.type('txt').send('Not found: '+ req.url);
            return;
        }
        // respond with json
        if (req.accepts('json')) {
            res.send({ error: 'Not found', url: req.url });
            return;
        }
        // default to plain-text. send()
        res.type('txt').send('Not found');
        //next();
    };
};