let morgan      = require('morgan'),
    session     = require('express-session'),
    bodyParser  = require('body-parser'),
    RedisStore 	= require('connect-redis')(session);

module.exports = function( app ){
    // Log it all in dev
    if( global.environment == 'development' ){
        app.use( morgan('dev') );
    } else {
        app.use( morgan('combined') );
    }

    // App user
    app.use( require('cookie-parser')() );
    app.use( bodyParser.urlencoded({extended: true}) ); // support encoded bodies
    app.use( require('lib/expressMiddleware/httpHeaders')() ); // custom middlewares
    app.use( require('lib/expressMiddleware/jsonOutput')() ); // custom middlewares
    app.use( bodyParser.json() ); // support json encoded bodies
    app.use( require("connect-flash")() );

    app.use(session({
        store: new RedisStore({
            client: redisClient
        }),
        secret: process.env.USER_MANAGEMENT_SESSION_SECRET,
        cookie: {
            maxAge: 1000*60*60*24
        },
        resave: false,
        saveUninitialized: false
    }));
};