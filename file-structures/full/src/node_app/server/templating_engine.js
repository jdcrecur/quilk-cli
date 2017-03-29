const _           = require('lodash'),
      nunjucks    = require('nunjucks');

module.exports = function( app ){

    // Set the app local vars. These are automatically picked up in the template engine
    app.locals.site_details = _.merge( require('site.config.json'), {
        asset_cache : (new Date()).getTime()
    } );

    // CONFIGURE THE NUNJUCKS TEMPLATING ENGINE
    nunjucks.configure( process.cwd() + '/src/node_app/views', _.merge({express: app}, require('nunjucks.config.json')) );
};