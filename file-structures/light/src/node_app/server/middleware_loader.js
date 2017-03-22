let morgan      = require('morgan'),
    bodyParser  = require('body-parser');


module.exports = function( app ){
    // Log it all in dev
    if( global.environment == 'development' ){
        app.use( morgan('dev') );
    } else {
        app.use( morgan('combined') );
    }

    // App user
    app.use( bodyParser.urlencoded({extended: true}) ); // support encoded bodies
    app.use( require('lib/expressMiddleware/httpHeaders')() ); // custom middlewares
    app.use( require('lib/expressMiddleware/jsonOutput')() ); // custom middlewares
    app.use( bodyParser.json() ); // support json encoded bodies
};