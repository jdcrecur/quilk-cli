const morgan      = require('morgan'),
      session     = require('express-session'),
      bodyParser  = require('body-parser'),
      RedisStore 	= require('connect-redis')(session);

module.exports = function( app ){

    // Log it
    app.use( morgan( ( global.environment === 'development' ) ? 'dev' : 'combined' ) );

    // App user
    app.use( require('cookie-parser')() );
    app.use( bodyParser.urlencoded({extended: true}) ); // support encoded bodies
    app.use( require('lib/expressMiddleware/httpHeaders')() ); // custom middlewares
    app.use( require('lib/expressMiddleware/jsonOutput')() ); // custom middlewares
    app.use( bodyParser.json() ); // support json encoded bodies
    app.use( require("connect-flash")() );

    //set the session
    app.use(session({
        store: new RedisStore({
            client: require('lib/system/redis_client')
        }),
        secret: process.env[ require('environment_variables.config.json')['session_secret']['key'] ],
        cookie: {
            maxAge: 1000*60*60*24
        },
        resave: false,
        saveUninitialized: false
    }));
};