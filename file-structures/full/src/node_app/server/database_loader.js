
const mongoose = require('mongoose');

module.exports = (  ) => {

    // configuration ===============================================================
    let config = require('mongo.config.json')[global.environment];
    mongoose.connect(config.url, config.options);

    let db = mongoose.connection;
    db.on('error', ( ) => {
        global.logger.error('Monoose connection error:');
        global.logger.error(arguments);
    });
    db.once('open', function() {
        // we're connected!
        global.logger.info( 'Mongoose connected.' );
    });
};