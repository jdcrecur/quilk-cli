const modelUser = require('database/models/model_user'),
      bcrypt    = require('bcrypt-nodejs');

let userQueries = {

    /**
     * Create a new user mongo document
     *
     * @param user_data
     * @returns {Promise}
     */
    createNewUser: ( user_data ) => {

        return new Promise( ( resolve, reject ) => {
            let newUser = new modelUser();

            newUser.local.email    	= user_data.username;

            newUser.local.password 	= newUser.generateHash(user_data.password);

            newUser.local.authenticated= false;

            //generate the hash then continue once received
            bcrypt.hash(user_data.email, null, null, ( err, hash ) => {
                newUser.hash.activate = hash;
                // save the user
                newUser.save( (err, user) => {
                    if (err) {
                        global.logger.error( err );
                        reject();
                    } else {
                        // //send out an email here
                        // global.

                        //now progress to done which will also log this user in.
                        resolve( user );
                    }
                });
            });
        } );
    },

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
                global.logger.error( err );
                return reject( );
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
            modelUser.find({"facebook.email":email}, function(err, user){
                if( err ) return reject( err );
                return resolve( user[0] );
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
            modelUser.find({"google.email":email}, function(err, user){
                if( err ) return reject( err );
                return resolve( user[0] );
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
            modelUser.find({"local.email":email}, (err, user) => {
                if( err ) {
                    console.log( err );
                    return reject( err );
                }
                return resolve( user[0] );
            });
        } );
    },

    /**
     * Returns a user found by id
     *
     * @param id
     * @param cb Callback
     */
    findOneById: ( id, cb ) => {
        modelUser.findById( id, cb);
    }
};

module.exports = userQueries;