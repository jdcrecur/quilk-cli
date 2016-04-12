var fs = require('fs');
module.exports = function( broserify_callback ) {

    broserify_callback = broserify_callback || function(){};

    logTime('Browserify starting');

    var bundlePath = __dirname + '/../public/browserify/bundle.js';

    /**
     * Set the browserify to work building the bundles.js file
     */
    var bundleFs = fs.createWriteStream( bundlePath );

    logTime('write stream created');

    var browserify = require('browserify');

    logTime('module loaded');

    var b = browserify({standalone: 'browserify'});
    b.add( __dirname + '/../browserifyMain.js');
    b.bundle().pipe(bundleFs);

    logTime('piped and awaiting cb');

    bundleFs.on('finish', function () {
        console.log('built browserify');
        logTime('finished writing the browserify file');

        //if not releae, just copy the file to all.min.js
        if( cliArgs.release){
            var compressor = require('node-minify');
            new compressor.minify({
                type: 'uglifyjs',
                fileIn: bundlePath,
                fileOut: bundlePath,
                callback: function(err, min){
                    console.log(err);
                    //console.log(min);
                    return broserify_callback();
                }
            });
        } else {
            return broserify_callback();
        }
    });
};