let queries_messages = require('database/queries/queries_messages');

module.exports = {

    /**
     * Handles the promised returned from the queries_messages module
     *
     * @returns {Promise}
     */
    getMessages: ( ) => {
        return new Promise(( resolve, reject )=>{
            queries_messages.getAll().then(
                ( data ) => {
                    resolve( data );
                },
                ( ) => {
                    resolve( [] );
                }
            ).catch( reject );
        })
    }
};