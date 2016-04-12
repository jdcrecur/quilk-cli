var mkdirp		= require('mkdirp'),
	http 		= require('http'),
	https 		= require('https'),
	request 	= require('request'),
	mime 		= require('mime'),
	path 		= require('path'),
	fs 			= require('fs');

module.exports = {

	/**
	 * Copy one file on a file system.
	 * @param source
	 * @param target
	 * @param callback
     */
	copyFile: function(source, target, callback) {
		var cbCalled = false;

		var rd = fs.createReadStream(source);
		rd.on("error", function(err) {
			done(err);
		});
		var wr = fs.createWriteStream(target);
		wr.on("error", function(err) {
			done(err);
		});
		wr.on("close", function(ex) {
			done();
		});
		rd.pipe(wr);

		function done(err) {
			if (!cbCalled) {
				callback(err);
				cbCalled = true;
			}
		}
	},

	/**
	 * Pass it a url to fetch, a destination to dump to and a callback function to run once done. Shimples..
	 * @param url
	 * @param dest
	 * @param callback
     */
	downloadFileTo: function(url, dest, callback) {
		request.head(url, function(err, res, body){
			request(url).pipe(fs.createWriteStream(dest)).on('close', function(){
				return callback( dest );
			});
		});
	}
};