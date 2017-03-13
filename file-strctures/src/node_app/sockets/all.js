'use strict';

module.exports = ( io ) => {

    io.on('connection', function (socket) {
        socket.on('hello', function () {
            socket.emit('goodbye', 'my friend');
        });
    });

    let emitResults = ( data ) => {
        io.emit('currentEventUpdate', data);
    };

    let emitWeather = ( data ) => {
        io.emit('currentWeatherUpdate', data);
    };

    //these are the events emited from the node app, see the the events folder
    global.eventEmiiter.addListener('currentEventUpdate', emitResults);
    global.eventEmiiter.addListener('currentWeatherUpdate', emitWeather);
};