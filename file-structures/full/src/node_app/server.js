'use strict';

// Set any missing env variables from their defaults defined in the default.json config file
require('lib/system/set_environment_variables')();


const cliarg      = require('jdc-node-cliarg-reader').readAll(),
      site        = require('site.config.json'),
      process_env = require('environment_variables.config.json'),
      express     = require('express'),
      app = express();

global.environment = cliarg.env || process.env[ process_env.environment.key ];

global.logger = require('lib/logging_lib');

// Register a global event emitter and open the ears to listening out for events triggered
global.eventEmitter = new (require('events')).EventEmitter();
require('events/events_loader.js');

// Express static file and header loader
require('server/database_loader')( app );
require('server/middleware_loader')( app );
require('server/static_file_loader')( app );
require('server/templating_engine')( app );
require('server/authentication_layer')( app, function( passport ){
    require('routes/route_loader')( app, passport );
} );


//open the socket connections
require('sockets/all.js')( require('socket.io')( ( require('http').Server(app) ).listen( process.env.APP_PORT ) ) );

// Let the console know the ears are open :)
global.logger.info( site.site_name  + ' server listening on port: ' + process.env[ process_env.http_port.key ] );