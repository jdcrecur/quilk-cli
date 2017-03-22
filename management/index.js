let cliargs = require('jdc-node-cliarg-reader').readAll();

if( cliargs['install-light'] ){
    require('./install-light');
}
else if( cliargs['install-full'] ){
    require('./install-full');
}
else if( cliargs.help ){
    require( './help' );
}