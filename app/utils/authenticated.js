// app/routes/utils/authenticated.js
var self = {

	// runs next if not authenticated, else routes to logged area
	no: function(req, res, next){
		//they are not logged in so just continue to the "next" function
		if (!req.isAuthenticated()) {
			return next();
		} else {
			//they are logged in, take them to /wish/ as this is where they should be for react to kick in
			return res.redirect('/wish/');
		}
	},

	// runs next if authenticated, else routes to the index
	yes: function(req, res, next) {
		//they are logged in, take them to /wish/ as this is where they should be for react to kick in
		if (req.isAuthenticated()) {
			return next();
		} else {
			//if json request then this is a timeout from within the app, send 401 amd let angular handle the redirect
			if( req.headers['x-requested-with'] == 'XMLHttpRequest' ){
				return res.status(401).send('ohhhh no you don\'t.. how do i know who you are?');
			} else {
				//they are not logged in so just continue to the "next" function
				return res.redirect('/');
			}
		}
	},

    yes_admin: function( req, res, next ){
        var thisModule = self;
        //they are logged in, take them to /wish/ as this is where they should be for react to kick in
        if (req.isAuthenticated()) {
            log( 'is authenticated' );
            if( thisModule.is_admin( req.user.userSetPrivateData.email ) ){
                log('is admin' );
                return next();
            } else {
                log( 'is not admin' );
                //if json request then this is a timeout from within the app, send 401 amd let angular handle the redirect
                if( req.headers['x-requested-with'] == 'XMLHttpRequest' ){

                    return res.send(401,'ohhhh no you don\'t.. how do i know who you are?');
                } else {
                    //they are not logged in so just continue to the "next" function
                    return res.redirect('/');
                }
            }
        } else {
            //if json request then this is a timeout from within the app, send 401 amd let angular handle the redirect
            if( req.headers['x-requested-with'] == 'XMLHttpRequest' ){
                return res.send(401,'ohhhh no you don\'t.. how do i know who you are?');
            } else {
                //they are not logged in so just continue to the "next" function
                return res.redirect('/');
            }
        }
    },

    is_admin: function( email ){
        var admin_users		= require( GLOBAL.site.appRoot + '/config/admin_users')();
        return !!(admin_users[ email ]);
    }
};

module.exports = self;