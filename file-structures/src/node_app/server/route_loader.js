module.exports = function ( app ) {
    app.use('/',      require("routes/views/routes_views"));
    app.use('/api/', require('routes/api/routes_messages'));
};