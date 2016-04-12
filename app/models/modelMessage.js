var mongoose = require('mongoose');

// define the schema for our user model
var messagesSchema = mongoose.Schema({
    message: String,
    name: String,
    email: String,
    input_date: date
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Messages', messagesSchema);
