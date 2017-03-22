let _ = require('lodash'),
    environment_variable_names = require('environment_variables.config.json');

module.exports = function(){
    _.forIn( environment_variable_names, ( env_obj, key ) => {
        if( typeof env_obj['key'] !== 'undefined' && !process.env[ env_obj['key'] ]){
            process.env[env_obj['key']] = env_obj['default'];
        }
    } );
};