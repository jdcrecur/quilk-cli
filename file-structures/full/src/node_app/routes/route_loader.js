module.exports = function ( app ) {

    //The app view routes
    app.use('/',                require("routes/views/routes_views"));

    //The app api routes
    app.use('/api/messages',    require('routes/api/routes_messages'));

    // Handle 404 requests last
    app.use( require('lib/expressMiddleware/404Handler.js')() );
};