
let mongoose = require('mongoose'),
    logging  = require('lib/logging_lib');

module.exports = (  ) => {

    // configuration ===============================================================
    let config = require('mongo.config.json')[global.environment];
    mongoose.connect(config.url, config.options);

    let db = mongoose.connection;
    db.on('error', ( ) => {
        logging.error('Monoose connection error:');
        logging.error(arguments);
    });
    db.once('open', function() {
        // we're connected!
        logging.info( 'Mongoose connected.' );
    });
};