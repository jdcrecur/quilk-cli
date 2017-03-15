let cliargs = require('jdc-node-cliarg-reader').readAll();

if( cliargs['install-light'] ){
    require('./install-light');
} else if( cliargs.help ){
    require( './help' );
}