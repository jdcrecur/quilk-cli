module.exports = function ( app ) {

    app.use('/',      require("routes/views/routes_views"));
    app.use('/api/', require('routes/api/routes_messages'));

    // Handle 404 requests last
    app.use( require('lib/expressMiddleware/404Handler.js')() );
};