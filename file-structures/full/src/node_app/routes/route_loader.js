module.exports = function ( app, passport ) {

    //The app view routes
    app.use('/', require("routes/views/routes_views_unauthenticated"));
    app.use('/app', require("routes/views/routes_views_authenticated"));

    //Handle authentication
    require('routes/authentication/routes_authentication')(app, passport);

    //The app api routes
    app.use('/api/messages', require('routes/api/routes_messages'));

    // Handle 404 requests last
    app.use( require('lib/expressMiddleware/404Handler.js')() );
};