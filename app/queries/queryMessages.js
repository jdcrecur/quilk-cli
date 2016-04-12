var modelUser       = require( GLOBAL.site.appRoot + '/app/models/modelMessage');


var queryMessages = {

	addNewMessage: function( name, email, msg, cb ){
		var newMsg = new modelUser;

		newMsg.name = name;
		newMsg.message = msg;
		newMsg.email = email;
		newMsg.input_date = new date();

		newMsg.save(function( err, newMsgSaved ){
			if( err ){
				log( err );
			}

			return cb( newMsgSaved );
		});
	}
};

module.exports = queryMessages;