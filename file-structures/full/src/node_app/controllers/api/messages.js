const queries_messages = require('database/queries/queries_messages');

module.exports = {

    /**
     * Queries all messages and returns via promise
     */
    getMessages: ( ) => {
        return queries_messages.getAll().then(( data ) => {
            resolve( data );
        }, ( ) => {
            reject( [] );
        });
    }
};