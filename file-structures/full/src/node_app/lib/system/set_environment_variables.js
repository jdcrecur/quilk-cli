let _ = require('lodash'),
    config = require('config');
module.exports = function(){
    let environment_variable_names = config.get('environment_variables');

    _.forIn( environment_variable_names, ( env_obj, key ) => {
        if( !process.env[ env_obj['key'] ]){
            process.env[env_obj['key']] = env_obj['default'];
        }
        console.log( env_obj['key'] );
        console.log( process.env[env_obj['key']] );
    } );
};