// app/routes/not_logged_in/general.js
var authenticated = require( GLOBAL.site.appRoot + '/app/utils/authenticated' ),
    formValidator	= require( GLOBAL.site.appRoot + '/app/utils/formValidator'),
	queryMessages = require( GLOBAL.site.appRoot + '/app/queries/queryMessages');


//module exports are essentially classes
module.exports = function( app ) {

	// the index page from a get request
	app.get('/', authenticated.no, function(req, res) {
		res.render('public/index.njk'); // load the index.swig file which extends the pageLayout.swig
	});

	//the index page with handling a post, the validator simply sets a success to true or false as well as which individuals failed too
	app.post('/', function(req, res) {
		formValidator({
			validateInputs:{
				name: {
					validators: ['not_empty']
				},
				email:{
					validators: ['not_empty', 'is_email']
				},
				message: {
					validators: ['not_empty']
				}
			},
			inputData:req.body,
			fail: function( returnJson ){
				res.json( returnJson );
			},
			success: function( returnJson ){

				//the validation passed, persist the message to mongo db
				queryMessages.addNewMessage( req.body.name, req.body.email, req.body.msg, function( newMsgSaved ){

					//the new message will be false or the new message object... act accoridngly.
					if( !newMsgSaved ){
						returnJson.success = false;
					}
					
					//output the 
					res.json( returnJson );
				});
			}
		});
	});
};