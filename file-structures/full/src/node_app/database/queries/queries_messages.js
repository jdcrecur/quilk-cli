
let jsonfile = require('jsonfile');

module.exports = {

    /**
     * Simple function returning mock json data
     *
     * @returns {Promise}
     */
    getAll: function(){
        return new Promise( ( resolve, reject ) => {

            jsonfile.readFile( '', (err, data) => {

                if( err ) reject( err );
                else resolve( data.messages );
            });
        } );
    }

};