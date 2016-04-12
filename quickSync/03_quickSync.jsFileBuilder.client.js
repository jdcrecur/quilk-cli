var fs = require('fs'),
	path = require('path');

var basePath = __dirname + '/..';

module.exports = function( callback ){
    callback = callback || function(){};

    //the bower js files
	var bowerJs = [
        basePath + '/public/bower_components/jquery/dist/jquery.min.js',
        basePath + '/quickSync/spacer.txt',

        basePath + '/public/bower_components/js-cookie/src/js.cookie.js',
        basePath + '/quickSync/spacer.txt'
	];

	//the files which must be included before the  rest of the js
    var appJs = [
        basePath + '/jsToCompile/app.js'
    ];

    //walk through the js_to_compile dir to get all js files
    require('recursive-readdir')('./jsToCompile/',
		/* ignore these file names */
		['app.js'],
		/* cb once all files aquired */
		function (err, files) {

			//Add the  discovered files to the base appJs array
			appJs = appJs.concat(files);

            logTime( 'Concatenating the following client app js files:' );
            logTime( appJs );

			//append the appJs files to the bowerJs files
			var filesToConcat = bowerJs.concat( appJs );

			//check all the js files actually exist
			for( var i=0;i<filesToConcat.length ; ++i){
				try{
					fs.statSync( filesToConcat[i] )
				} catch( err ){
					//err = no files, log error and abort
					console.log( err );
					console.log( '#####################################################' );
					console.log( '#####################################################' );
					console.log( '#####################################################' );
                    logTime( 'One or more js files not found, aborting quick sync.' );
					return false;
				}
			}

			//last but not least, concat them all together
			require('concat-files')( filesToConcat, basePath + '/public/js/all.js', function() {
                logTime( 'Built concatenated js file: ' + basePath + '/public/js/all.js' );

                //if not releae, just copy the file to all.min.js
                if( !cliArgs.release){
                    var fse = require('fs-extra');
                    fse.copy( basePath + '/public/js/all.js', basePath + '/public/js/all.min.js', function (err) {
                        if (err) {
                            return console.error(err);
                        }
                        return callback();
                    });
                } else {
                    var compressor = require('node-minify');
                    new compressor.minify({
                        type: 'uglifyjs',
                        fileIn: basePath + '/public/js/all.js',
                        fileOut: basePath + '/public/js/all.min.js',
                        callback: function(err, min){
                            console.log(err);
                            //console.log(min);
                            return callback();
                        }
                    });
                }
			});
    });
};