const modelUser = require('database/models/model_user');

let userQueries = {

    /**
     * Checks the current database for users registered to the given email.
     * Success object format
     * {
     *   user: user || false,
     *   authType: {
     *       facebook: true || false
     *       google:   true || false
     *       local:    true || false
     *   }
     * }
     *
     * @param email
     * @returns {Promise}
     */
    registeredEmailCheck: ( email ) => {
        return new Promise( ( resolve, reject ) => {
            let user = false,
                authTypes = {
                    local: false,
                    facebook: false,
                    google: false
                };

            function error( err ){
                return reject( err );
            }

            userQueries.findOneByLocalEmail(email).then( ( localUser ) => {

                if (localUser) {
                    user = localUser;
                    authTypes.local = true;
                }

                userQueries.findByFacebookEmail(email).then( ( facebookUser ) => {

                    if( facebookUser ){
                        user = facebookUser;
                        authTypes.facebook = true;
                    }

                    userQueries.findByGoogleEmail(email).then( ( googleUser ) => {

                        if( googleUser ){
                            user = googleUser;
                            authTypes.google = true;
                        }

                        return resolve( {
                            user: user,
                            authTypes: authTypes
                        } );
                    }, error );
                }, error );
            }, error );
        } );
    },

    /**
     * Returns a matching user matched by facebook email
     *
     * @param email
     * @returns {Promise}
     */
    findByFacebookEmail: ( email ) => {
        return new Promise( ( resolve, reject ) => {
            modelUser.findOne({"facebook.email":email}, function(err, user){
                if( err ) return reject( err );
                return resolve( user );
            });
        } );
    },

    /**
     * Returns a matching user matched by google email
     *
     * @param email
     * @returns {Promise}
     */
    findByGoogleEmail: ( email ) => {
        return new Promise( ( resolve, reject ) => {
            modelUser.findOne({"local.email":email}, function(err, user){
                if( err ) return reject( err );
                return resolve( user );
            });
        } );
    },

    /**
     * Returns a matching user matched by local email
     *
     * @param email
     * @returns {Promise}
     */
    findOneByLocalEmail: ( email ) => {
        return new Promise( ( resolve, reject ) => {
            modelUser.findOne({"google.email":email}, function(err, user){
                if( err ) return reject( err );
                return resolve( user );
            });
        } );
    }
};

return userQueries;