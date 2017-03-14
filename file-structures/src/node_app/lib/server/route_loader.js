let _ = require('lodash'),
    jsonfile = require('jsonfile');

module.exports = ( app ) => {
    jsonfile.readFile( process.cwd() + '/src/node_app/route_loader.json', (err, routeCollections) => {
        if( err ) console.log( err );
        else {

            _.map( routeCollections, function( collection ){

                _.map( collection.routes, function( route ){

                    console.log( collection.prefix );
                    console.log( route );

                    app.use( collection.prefix, require( route ));

                } );
            } );
        }
    });
};