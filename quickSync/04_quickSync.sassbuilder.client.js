var fs = require('fs');

var basePath = __dirname + '/..';

var scssPath        = basePath + '/sass/all.scss',
	outputPath      = basePath + '/public/css/all.css';

var bower_component_css = [
    basePath + '/public/bower_components/bootstrap/dist/css/bootstrap.min.css',
    outputPath
];

module.exports = function( callback ){

    logTime( 'Building css file from: ' + scssPath );

	var sassRenderOpts;
	if( cliArgs.release){
		sassRenderOpts = {
			file: scssPath,
			outFile: outputPath,
			outputStyle: 'compressed',
			sourceComments: false
		};
	} else {
		sassRenderOpts = {
			file: scssPath,
			outFile: outputPath,
			outputStyle: 'expanded',
			sourceComments: true
		};
	}


	require('node-sass').render( sassRenderOpts, function( err, result ){
		//this is the complete function that runs after the css file has been written to the buffer
		if( err ){
			console.log( err );
			return logTime( '^^^ Sorry there was an error compiling the scss file ^^^' );
		}

		fs.writeFile(outputPath, result.css.toString() , function(err) {
			console.log( 'Built css file to: ' + outputPath );

            //now we have built the all.css, append the bower component specific stuff, eg ng-dialog
            require('concat-files')( bower_component_css, outputPath, function() {
                logTime('Added the bower component css files to the all.css');
                if( typeof callback === 'function' ) callback();
            });
		});
	});
};