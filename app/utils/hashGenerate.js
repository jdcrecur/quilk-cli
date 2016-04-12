var crypto = require('crypto');

/**
 * Example use case
 * var hashGenerate = require( GLOBAL.site.appRoot + '/app/utils/hashGenerate');
 * hashGenerate('somestringtohashup',function( theGeneratedHash ){
 * 		//do something cool with the hash
 * });
 */

module.exports = function( text, type, callback ){
	var key,
		algorithm = 'sha1',
		hmac;
	if( typeof type === 'function' ){
		key = (new Date()).valueOf().toString();
		callback = type;
	} else if( typeof type === 'string' ){
		key = 'constant';
	}

	hmac = crypto.createHmac(algorithm, key);

	// readout format:
	hmac.setEncoding('hex');
	//or also commonly: hmac.setEncoding('base64');

	// callback is attached as listener to stream's finish event:
	hmac.end(text, function () {
		return callback( hmac.read() );
	});
};