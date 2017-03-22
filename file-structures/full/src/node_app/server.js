'use strict';

// Set any missing env variables from their defaults defined in the default.json config file
require('lib/system/set_environment_variables')();

// Import the goodies, or require...
let cliarg      = require('jdc-node-cliarg-reader').readAll(),
    site        = require('site.config.json'),
    process_env = require('environment_variables.config.json');

global.environment = cliarg.env || process.env[ process_env.environment.key ];

let express     = require('express'),
    logging     = require('lib/logging_lib');

// The express instance
let app = express();

// Register a global event listener
global.eventEmiiter = new (require('events')).EventEmitter();

//including global event emitters
require('events/all')();


// Express static file and header loader
require('server/middleware_loader')( app );
require('server/static_file_loader')( app );
require('server/templating_engine')( app );
require('server/authentication_layer')( app );
require('routes/route_loader')( app );

//open the socket connections
require('sockets/all.js')( require('socket.io')( ( require('http').Server(app) ).listen( process.env.APP_PORT ) ) );

// Let the console know the ears are open :)

logging.info( site.site_name  + ' server listening on port: ' + process.env[ process_env.http_port.key ] );