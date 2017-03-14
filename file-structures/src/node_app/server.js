'use strict';
// Import the goodies, or require...
let cliarg      = require('jdc-node-cliarg-reader').readAll(),
    express     = require('express'),
    logging     = require('lib/logging_lib'),
    config      = require('config'),
    site        = config.get('site'),
    environment_variable_names = config.get('environment_variables'),
    port        = process.env[ environment_variable_names.http_port ] || site.http_port;

global.environment = cliarg.env || 'production';

// The express instance
let app = express();

// Register a global event listener
global.eventEmiiter = new (require('events')).EventEmitter();

//including global event emitters
require('events/all')();

// Express static file and header loader
require('server/static_file_loader')( app );

// The route loader
require('server/templating_engine')( app );

// The route loader
require('server/route_loader')( app );

// Handle 404 requests
app.use( require('lib/expressMiddleware/404Handler.js')() );

//open the socket connections
require('sockets/all.js')( require('socket.io')( ( require('http').Server(app) ).listen(port) ) );

// Let the console know the ears are open :)
logging.info( site.site_name  + ' server listening on port: ' + port );