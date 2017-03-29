module.exports = function ( app, passport ) {

    //Handle authentication routes
    require('routes/authentication/authentication')(app, passport);

    //The app view routes
    app.use('/', require("routes/views/unauthenticated"));
    app.use('/app', require("routes/views/authenticated"));

    //The app api routes
    app.use('/api/user', require('routes/api/user'));
    app.use('/api/messages', require('routes/api/messages'));

    // Handle 404 requests last
    app.use( require('lib/expressMiddleware/404Handler.js')() );
};