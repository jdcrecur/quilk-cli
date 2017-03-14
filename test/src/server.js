let _ = require('lodash');
let modules = [ "modules/test" ];

require( 'modules/test' )();

_.map( modules, function( module ){
    require( module );
});

