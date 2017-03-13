'use strict';

// Set the current environment
let cliarg = require('jdc-node-cliarg-reader').readAll();
global.environment = cliarg.env || 'production';

// Import the goodies, or require...
let express     = require('express'),
    path        = require('path'),
    morgan      = require('morgan'),
    nunjucks    = require('nunjucks'),
    logging     = require('lib/logging_lib'),
    bodyParser  = require('body-parser'),
    config      = require('config');

//get the site config data
let site = config.get('site'),
    environment_variable_names = config.get('environment_variables');


// The express instance
let app = express();


// Register a global event listener
let events = require('events');
global.eventEmiiter = new events.EventEmitter();

// Register the global cache integer
global.asset_cache = (new Date()).getTime();

//including global event emitters
require('events/all.js')();

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

//Static routes to the js and css, also the bower components
let staticCacheHeaders = ( global.environment != 'development' )? { maxage: 86400000*60 }: {};
app.use( '/css',                express.static( path.join( process.cwd(), '/src/public/css'), staticCacheHeaders ) );
app.use( '/images',             express.static( path.join( process.cwd(), '/src/public/img'), staticCacheHeaders ) );
app.use( '/js',                 express.static( path.join( process.cwd(), '/src/public/js'), staticCacheHeaders ) );


// Set the app local vars. These are automatically picked up in the template engine
app.locals.site_details = {
    url: 'www.myproject.com'
};


// CONFIGURE THE NUNJUCKS TEMPLATING ENGINE
nunjucks.configure( process.cwd() + '/src/node_app/views', {
    autoescape: true,
    express: app,
    tags: {
        blockStart: '{%',
        blockEnd: '%}',
        variableStart: '{{',
        variableEnd: '}}',
        commentStart: '{#',
        commentEnd: '#}'
    }
});


// API
app.use('/api/', require('routes/api/route_proxy.js'));

// Views
require('routes/views/routes_views.js')(app);

// Handle 404s
app.use( require('lib/expressMiddleware/404Handler.js')() );

//the port
let authHttpsPort   = process.env[ environment_variable_names.http_port ] || site.http_port;

//open the socket connections
let server = require('http').Server(app);
server.listen(authHttpsPort);

let io = require('socket.io')(server);
require('sockets/all.js')( io );

// Let the console know the ears are open :)
logging.info( site.site_name  + ' server listening on port: ' + authHttpsPort );
