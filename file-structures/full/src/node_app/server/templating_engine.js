let nunjucks    = require('nunjucks'),
    config      = require('config');

module.exports = function( app ){

    // Set the app local vars. These are automatically picked up in the template engine
    app.locals.site_details = {
        url: 'www.myproject.com',
        asset_cache : (new Date()).getTime()
    };

    // CONFIGURE THE NUNJUCKS TEMPLATING ENGINE
    nunjucks.configure( process.cwd() + '/src/node_app/views', {
        autoescape: true,
        express: app,
        tags: config.get('template_tags')
    });
};