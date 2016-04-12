/**
 * Load in the nodejs modules required for quick sync to run
 */
var chokidar    = require('chokidar'),
    readdir     = require('recursive-readdir'),
    path        = require('path'),
    naturalSort = require('javascript-natural-sort'),
    error       = false;

/**
 * SImple function to read all the cli arguments into the app
 * @returns {{}}
 */
readCliArgs = function(){
    //get the arguments passed to the file
    var cliArgsObj = {};
    process.argv.forEach(function(val, index, array) {
        //check if the arg is a variable=value pair
        if( val.indexOf('=') > 0 ){
            val = val.split('=');
            //split the value with the | if | exists in string
            if( val[1].indexOf('|') > 0 ){
                //break the val[1] into an array
                //else simply place the value
                cliArgsObj[val[0]] = val[1].split('|');
            } else {
                //else simply place the value
                cliArgsObj[val[0]] = val[1];
            }
        } else {
            cliArgsObj[val] = true;
        }
    });
    return cliArgsObj;
};
cliArgs = readCliArgs();

if( cliArgs.help ){
    var available_commands = {
        developer: 'A valid developer found in the quickSync.json file',
        d: 'A shortcut to the developer keyword',
        sync_only: 'Will only sync the file set using the rsync module',
        quiet: 'Silences some of the notification bubbles',
        watch: 'Watch the folders marked in the quickSync.json file, on change run the quickSync modules'
    };
    return console.log( available_commands );
}

if( cliArgs.d ){
    cliArgs.developer = cliArgs.d;
}

/**
 * Check we have a developer
 */
if( !cliArgs.developer && !cliArgs.release ){
    console.log('ERROR: Please pass a developer to the quickSync tool.');
    return false;
}
if( cliArgs.developer == 'release' ){
    console.log('ERROR: Developer name "release" is reserved. Please choose a different name');
    return false;
}

quickSyncConf = require('./quickSync.json');

/**
 * Attempt to load in the config file.
 */
try{
    if( typeof quickSyncConf.folders_to_watch === 'undefined' ){
        console.log( 'ERROR' );
        console.log( 'There are no folders to watch in the quickSync.json file' );
        error = true;
    }
    if( typeof quickSyncConf.run_on_events === 'undefined' ){
        console.log( 'ERROR' );
        console.log( 'There are no events to run on in the quickSync.json file' );
        error = true;
    }
    if( typeof quickSyncConf.developers === 'undefined' ){
        console.log( 'ERROR' );
        console.log( 'There are no developers defined in the quickSync.json file' );
        error = true;
    }
} catch( err ){
    console.log( 'ERROR' );
    console.log( err );

    error = true;
}
if( error ){
    return false;
}

/**
 * Check we have a valid developer
 */
if( !quickSyncConf.developers[cliArgs.developer] && !cliArgs.release ){
    console.log('ERROR: You have not passed a valid developer. Please enter a valid developer from the quickSync.json file');
    return false
}

if( cliArgs.release ) {
    if( !quickSyncConf.release_commands[cliArgs.release] ){
        console.log('ERROR: You have entered release with no valid option, eg release=dev');
        return false
    }
}

//now set up the release object for the usual quickSync modules to run without error
if( !quickSyncConf.developers[cliArgs.developer] && cliArgs.release ) {
    cliArgs.developer = 'release';
    quickSyncConf.developers['release'] = {
        notifier: {
            on: false
        },
        rsync : false
    };
}

/**
 * Setup the notifier based on the quickSync.json settings
 */
desktopNotify = function ( title, message ){
    if(quickSyncConf.developers[cliArgs.developer].notifier.on){
        var notifier, s, t;
        if( quickSyncConf.developers[cliArgs.developer].notifier.style ){
            switch( quickSyncConf.developers[cliArgs.developer].notifier.style ){
                case 'WindowsBalloon': {
                    const WindowsBalloon = require('node-notifier').WindowsBalloon;
                    notifier = new WindowsBalloon({
                        withFallback: false, // Try Windows Toast and Growl first?
                        customPath: void 0 // Relative path if you want to use your fork of notifu
                    });
                    t = quickSyncConf.developers[cliArgs.developer].notifier.time || 2500;
                    s = quickSyncConf.developers[cliArgs.developer].notifier.sound || false;
                    notifier.notify({
                        title: title,
                        message: message,
                        time: t,
                        sound: s
                    });
                } break;
                case 'WindowsToaster': {
                    const WindowsToaster = require('node-notifier').WindowsToaster;
                    notifier = new WindowsToaster({
                        withFallback: false, // Fallback to Growl or Balloons?
                        customPath: void 0 // Relative path if you want to use your fork of toast.exe
                    });
                    s = quickSyncConf.developers[cliArgs.developer].notifier.sound || false;
                    notifier.notify({
                        title: title,
                        message: message,
                        sound: s
                    });
                } break;
                case 'Growl':{
                    const Growl = require('node-notifier').Growl;

                    notifier = new Growl({
                        name: 'Growl Name Used', // Defaults as 'Node'
                        host: 'localhost',
                        port: 23053
                    });
                    notifier.notify({
                        title: title,
                        message: message
                    });
                } break;
                case 'NotifySend':{
                    const NotifySend = require('node-notifier').NotifySend;

                    notifier = new NotifySend();
                    t = quickSyncConf.developers[cliArgs.developer].notifier.time || 2500;
                    notifier.notify({
                        title: title,
                        message: message,
                        time: t
                    });
                } break;
                default: {
                    notifier = require('node-notifier');
                    notifier.notify({
                        'title': title,
                        'message': message
                    });
                } break;
            }
        }
    }
};

/**
 * The following is to place into the gloabl namespace logTime
 * This is usefull for logging to the terminal from within any of the quickSync modules
 */
time = function time(){
    var t = new Date().getTime();
    return Math.floor( Number(t) / 1000 );
};
start = time();
logTime = function( message ){
    console.log( message );
    console.log( 'Time' + (Number(time()) - Number(start)) );
};


/**
 * The release command runner
 */
function releaseCommandRunner( commands, cb ){
    if( commands.length > 0 ){
        var command = commands.shift();
        var exec = require('child_process').exec;
        console.log( 'RELEASE COMMAND RUNNING: ' + command );
        exec( command, function( error, stdout, stderr ){
            if( error ){
                console.log( 'ERROR:' );
                console.log( error );
                console.log( stderr );
                console.log( 'ERROR' );
            } else {
                console.log( stdout );
                return releaseCommandRunner(commands, cb);
            }
        })
    } else {
        console.log( 'All release commands run. Now running callback.' );
        cb();
    }
}

/**
 * The ignore function is run on each file found from the readdir function.
 * If the return is false then the file is not passed to the final array in the cb.
 * Only js files are passed in this case.
 * @param file
 * @param stats
 * @returns {boolean}
 */
function ignoreFunc(file, stats) {
    return (path.basename(file).indexOf('.js') === -1);
}

/**
 * The build function called by the watcher
 */
var building = false;
var waiting = false;
var haltBuild = false;
function build( cb ) {

    start = time();

    if(!cliArgs.quiet){
        desktopNotify( 'Running quick sync ', ' ' );
    }

    readdir('./quickSync/', [ignoreFunc], function (err, files) {
        if (err) return console.log(err);

        //nat. sort the array of files returned
        files.sort(naturalSort);

        console.log(files);

        var module;

        //walk through the files running one at a time
        var lastModule = '';
        function runQuickSyncs(quickSyncs) {
            building = true;
            if (quickSyncs.length > 0) {
                if(!haltBuild){
                    var file = './' + quickSyncs.shift();
                    console.log(quickSyncs.length);
                    console.log('File to run: ' + file);
                    lastModule = file;
                    module = require(file);
                    desktopNotify( lastModule, 'Now starting' );
                    module(function () {
                        runQuickSyncs(quickSyncs);
                    });
                } else {
                    desktopNotify( 'Restarting quickSync ', 'Last module run: '+lastModule );
                    console.log( 'Halting the quickSync' );
                    building = false;
                    haltBuild = false;
                }
            } else {
                building = false;
                haltBuild = false;
                console.log('  ');
                console.log('  ');
                console.log('Total time to run quickSyncs: ' + (Number(time()) - Number(start)) + 'seconds');
                if(!cliArgs.quiet){
                    desktopNotify( 'quickSync finished', 'Total time: ' + (Number(time()) - Number(start)) + 'seconds');
                }

                if( cb ){
                    cb();
                }
            }
        }

        //anndd go.
        runQuickSyncs(files);
    });
}

/**
 * The watcher function
 */
var watcher = function(){
    if( cliArgs.watch ){
        desktopNotify( 'Adding the files to watch', 'This may take up to 10 seconds. Wait for the console to stop flickering.');
        // One-liner for current directory, ignores .dotfiles
        chokidar.watch(quickSyncConf["folders_to_watch"], {
            persistent: true
        }).on('all', function (event, path) {
            console.log(event, path);
            if (quickSyncConf['run_on_events'].indexOf(event) !== -1) {
                if( waiting ){
                    console.log( 'Already waiting for a previous queue to finish.' );
                } else {
                    console.log('Event "' + event + '" found in quickSync.json so running now.');
                    if( building ){
                        waiting = true;
                        console.log( 'quickSync already in progress, waiting.' );
                        haltBuild = true;
                        //now wait for the previous builds to finish before starting a new one.
                        var interaval = setInterval(function(){
                            if( !building ){
                                clearInterval( interaval );
                                waiting = false;
                                build();
                            }
                        },500);
                    } else {
                        build();
                    }
                }
            }
        });
    }
};

//if releasing, run the release command before running the quickSync modules
if (cliArgs.release){
    console.log( 'RELEASE COMMANDS TO RUN: ' );
    console.log(quickSyncConf.release_commands[cliArgs.release]);
    //trigger the release commands
    releaseCommandRunner( quickSyncConf.release_commands[cliArgs.release], function(){
        console.log('RELEASE COMMANDS COMPLETE');
        console.log('RUNNING BUILD');
        build();
    });
}
//not release, just run the build and pass in the watcher as the callback (this will only watch is the watch cli command has been passed.
else {
    build(function() {
        watcher();
    });
}