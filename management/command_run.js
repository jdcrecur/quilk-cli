const spawn = require('child_process').spawn,
      _ = require('lodash'),
      clc   = require('cli-color');

module.exports = function( program, args, next ){
    if( typeof args === 'function' ){
        next = args;
        args = [];
    }

    let command = spawn(program, args);

    let a = program;
    _.map(args, (arg) => {
        a += ' '+arg;
    } );

    console.log('Starting command: ' + clc.bold.green( a ) );

    command.stdout.on('data', function(data)  {
        console.log( data );
    });

    command.stderr.on('data', function(data) {
        console.log('Error or warning:');
        console.log( data );
    });

    command.on('close', function() {
        if( next ) next();
    });
};