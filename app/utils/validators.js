"use strict";

module.exports = {

	parse: function( validatorString, inputToCheck, inputData ){
		// Only thing to do here is split at : and pass input and poss validator param to desired function
		var parts = validatorString.split(':');
		var retVal = 'running';
		if( parts.length == 3 ){
			retVal = this[ parts[0] ]( inputToCheck, parts[1], parts[2], inputData );
		} else if( parts.length == 2 ){
			retVal = this[ parts[0] ]( inputToCheck, parts[1], undefined, inputData );
		} else {
			retVal = this[ parts[0] ]( inputToCheck, undefined, undefined, inputData );
		}
		return retVal;
	},
	not_empty: function( a ){
		var returnVal = false;
		function isnotempty( ){
            returnVal = true;
		}
		if(a!='' && a!==null && typeof a!=='undefined' ){
            isnotempty(  );
        }
		if(a === 0){
            isnotempty( );
		}
		return returnVal;
	},
	not_negative_int: function( a ){
		var returnVal = false;
		if( parseInt(a) >= 0 ){
			returnVal = true;
		}
		return returnVal;
	},
	is_alphanumeric: function( a ){
		var returnVal = false,
			pattern = new RegExp(/^[a-z0-9]+$/i);
		if( pattern.test( a ) ){
			returnVal = true;
		}
		return returnVal;
	},
	is_alphanumeric_hyphen: function( a ){
		var returnVal = false,
			pattern = new RegExp(/^[a-zA-Z0-9.-]+$/);
		if( pattern.test( a ) ){
			returnVal = true;
		}
		return returnVal;
	},
	is_alphanumeric_underscore: function(a){
		var returnVal = false,
			pattern = new RegExp(/^\w+$/);
		if( pattern.test( a ) ){
			returnVal = true;
		}
		return returnVal;
	},
	is_alphanumeric_hyphen_space_slash_colon: function(a){
		var returnVal = false,
			pattern = new RegExp(/^[a-zA-Z0-9./: -]+$/);
		if( pattern.test( a ) ){
			returnVal = true;
		}
		return returnVal;
	},
	is_number_between: function( a,b,c ){
		var returnVal = false;
		if( Number(b) <= Number(a) &&  Number(a) <= Number(c) ){
			returnVal = true;
		}
		return returnVal;
	},
	is_only_letters: function(a){
		var returnVal = false,
			pattern = new RegExp(/^[a-zA-Z]+$/);
		if( pattern.test( a ) ){
			returnVal = true;
		}
		return returnVal;
	},
	is_boolean: function( a ){
		var returnVal = false;
		if( typeof a === 'boolean'){
			returnVal = true;
		}
		return returnVal;
	},
	is_positive_integer: function(a){
		var returnVal = false;
		if (a === parseInt(a, 10)){
			if( a > 0 ){
				returnVal = true;
			}
		}
		return returnVal;
	},
	is_only_number: function(a){
		var returnVal = false;
		if( /^\d+$/.test( a ) ){
			returnVal = true;
		}
		return returnVal;
	},
	is_smaller_than: function( a,b ){
		var returnVal = false;
		a = parseInt(a);
		b = parseInt(b);
		if( a < b ){
			returnVal = true;
		}
		return returnVal;
	},
	is_greater_than: function( a,b ){
		var returnVal = false;
		a = parseInt(a);
		b = parseInt(b);
		if( a > b ){
			returnVal = true;
		}
		return returnVal;
	},
	is_min_length: function( a, b ){
		var returnVal = false;
		b = parseInt(b);
		if( a.length >= b ){
			returnVal = true;
		}
		return returnVal;
	},
	is_length: function( a, b ){
		var returnVal = false;
		b = parseInt(b);
		if( a.length == b ){
			returnVal = true;
		}
		return returnVal;
	},
	is_max_length: function( a, b ){
		var returnVal = false;
		b = parseInt(b);
		if( a.length <= b ){
			returnVal = true;
		}
		return returnVal;
	},
	is_longer_than: function(a, b ){
		var returnVal = false;
		b = parseInt(b);
		if( a.length > b ){
			returnVal = true;
		}
		return returnVal;
	},
    is_same_as: function( a, param1, param2, inputData ){
        var returnVal = false;
		if( a == inputData[param1] ){
			returnVal = true;
		}
		return returnVal;
    },
	is_string: function(a){
		var returnVal = false;
		if( typeof a === 'string' ){
			returnVal = true;
		}
		return returnVal;
	},

	is_url: function(a){
		var returnVal = false;
		var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi,
			patt = new RegExp( urlPattern ),
			res = patt.exec( a );
		if( res ){
			returnVal = true
		}
		return returnVal;
	},

	disallowed_password_words: ['password','secret'],
	is_valid_password: function(a){
		var returnVal = false;
		if( a.length >= 8 ){
			returnVal = true;
		}
		var badPwordPats = this.disallowed_password_words;
		for( var i = 0; i < badPwordPats.length ; ++i ){
			if( a.indexOf(badPwordPats[i]) != -1 ){
				returnVal = false;
				break;
			}
		}
		return returnVal;
	},

	is_email: function( a ){
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(a);
	}
};