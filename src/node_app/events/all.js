'use strict';

module.exports = ( ) => {
    // 10 second interval to get the current active contest part (dummy data and does not actually ping any api's)
    let currentEventUpdate = setInterval( (  ) => {
        global.eventEmiiter.emit('currentEventUpdate', {
            update: 'No updated events'
        });
    },10*1000);

    // 115 interval grab the weather data (dummy data and does not actually ping any api's)
    let currentWeatherUpdate = setInterval( (  ) => {
        global.eventEmiiter.emit('currentWeatherUpdate', {
            update: 'No weather changes yet'
        });
    },300*1000);
};