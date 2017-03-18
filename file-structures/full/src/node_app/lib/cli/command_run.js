var spawn = require('child_process').spawn,
    clc   = require('cli-color');

module.exports = function( program, args, next ){
    var command = spawn(program, args);

    command.stdout.on('data', function(data)  {
        log(' ' + data);
    });

    command.stderr.on('data', function(data) {
        log(clc.bold.red('Error:'));
        log( ' ' + data );
    });

    command.on('close', function(code) {
        log( program + ' finished with code ' + code);
        if( next ){
            next();
        }
    });
};