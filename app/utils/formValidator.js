"use strict";

/**
 * One gateway to be used by all ajax forms.
 * We will expand this based on requirements.
 *
 * If an element can be null, but when not null must be validated, then set the first validator to 'can_be_null'
 *
 * ****EXAMPLE USE:*******
var formValidator = require( GLOBAL.site.appRoot +  'app/utils/formValidator.js');

formValidator({

	//an object of validators, the keys are names of the expected inputs
	validateInputs:{
		title: {
			//each validator string is a method in the validators module included at the top of this file
			validators: ['is_max_length:20']
		},
		description:{
			validators: ['not_empty', 'is_min_length:10']
		},
		website: {
			validators: ['can_be_null', 'is_url']
		}
	},

	//the input paramters, for get and post these should be in the req.body or a plain old object (which is what req.body is anyway :] )
	inputData:{
		title: 'bobs you uncle',
		description: 'fanny is not your aunt',
		website: ''
	},

	//some function that runs then the validators fail. The failed object will be the 1st param
	fail: function( returnJson ){

	},

	//some function that runs then the validators pass. The failed object will be the 1st param
	success: function( returnJson ){

	}
});
 *****END OF EXAMPLE USE:*******
 *
 *****EXAMPLE RETURN JSON ******
 * camelCaseReturn
 * {
		success : false,
		inputData:{
			wish_description : 'some string',
			wish_title : 'some string',
			some_input_that_wasnt_required : 'some string'
		},
		requiredFields : {
			wish_description : {
				success: true or false,
				validators: ['not_empty', 'is_min_length:30'],
				failed_validators: [] or ['is_min_length:30'] or ['not_empty', 'is_min_length:30']
			},
			wish_title : {
				success: true or false,
				validators: ['is_max_length:20'],
				failed_validators: [] or ['is_max_length:20']
			}
		},
		errorFields: {
			wish_title: true,
			wish_description: true
		}
	}
 *
 *****END EXAMPLE RETURN JSON ******
 */
module.exports = function( inputObject ){
	inputObject = inputObject || {};

	//ensure that there is a fail, success and inputData in the passed object
	if( !inputObject.fail ){
		throw {error:'There was an error in the data passed, no fail method was passed.' };
	}
	if( !inputObject.success ){
		throw {error:'There was an error in the data passed, no success method was passed.' };
	}
	if( !inputObject.inputData ){
		throw {error:'There was an error in the data passed, no inputData was passed.' };
	}

	/* Build up the json object */
	var response_json = {
		success : true,
		inputData : inputObject.inputData,
		requiredFields : {},
		errorFields : {}
	};

	for( var key in inputObject.validateInputs ){
		var validatorsToCall = inputObject.validateInputs[key].validators || [];
		response_json.requiredFields[ key ] = {
			success : false,
			fail	: false,
			validators : validatorsToCall,
			failed_validators: []
		};
	}

	var validators = false;
	if( typeof wishAppModules != 'undefined' ){
		if( wishAppModules.validators ){
			validators = wishAppModules.validators;
		}
	}
	if( !validators ){
		validators = require( './validators');
	}

	/* Check form data received from client */
	for(key in response_json.requiredFields){
		//loop the validators to see if this input passes
		for( var i = 0 ; i < response_json.requiredFields[key].validators.length ; ++i ){
			var receivedVal = inputObject.inputData[key];
			//check the input is not actually a zero
			if( Number(receivedVal) !== 0 && !receivedVal ){
			    receivedVal = '';
			}
			if( response_json.requiredFields[key].validators[i] == 'can_be_null' ){
				if( receivedVal == '' ){
					//ignore the rest of the validators, if this can be null and is null
					response_json.requiredFields[key].success = true;
					break;
				} else {
					//else continue onto the next validator for this element
					continue;
				}
			}
			var success = validators.parse( response_json.requiredFields[key].validators[i] , receivedVal, response_json.inputData );
			if( success ){
				response_json.requiredFields[key].success = true;
			} else {
				response_json.requiredFields[key].success = false;
				response_json.requiredFields[key].fail = true;
				response_json.success = false;
				response_json.requiredFields[key].failed_validators.push( response_json.requiredFields[key].validators[i] );
				//don't bother running any of the tests, as one has failed
				break;
			}
		}
	}

	/* If success run the success method, else run the fail method, or thwo error if nothing was passed */
	if( response_json.success ){
		return inputObject.success( response_json );
	} else {
		return inputObject.fail( response_json );
	}
};