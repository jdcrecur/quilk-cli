let cliargs = require('jdc-node-cliarg-reader').readAll();

if( cliargs['install-base-nodejs-app'] ){
    require('./install-base-nodejs-app');
} else if( cliargs.help ){
    require( './help' );
}