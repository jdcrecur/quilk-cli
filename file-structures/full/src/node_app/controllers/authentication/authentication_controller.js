let QueriesUser = require('database/queries/queries_user'),
    ModelUser = require('database/models/model_user'),
    logging     = require('lib/logging_lib');

module.exports =  {

    /**
     * Simple logout
     *
     * @param req
     * @param res
     */
    logout: ( req, res ) => {
        req.logout();
        res.redirect('/');
    },

    /**
     * Register a new account controller
     *
     * @param req
     * @param res
     */
    register: ( req, res ) => {
        //create the account and login
        QueriesUser.createNewUser( req.body ).then( ( user )=>{
            req.login( user, () => {
                res.redirect('/app');
            } );
        }).catch( (e) => {
            //handle the error.
            req.flash('errors', {error: true});  // We don't want to be mixing in copy to the controller. Just pass an error flag and let the view handle the rest.
            res.redirect('/register');
        });
    },

    /**
     * Login
     *
     * @param req
     * @param username
     * @param password
     * @param done
     */
    login: ( req, username, password, done ) => {

        let genericFail = 'Incorrect! Try again.';

        QueriesUser.findOneByLocalEmail( username ).then(function( user ){

            if( !user ) {
                return done(null, false, req.flash('errors', true));
            }

            if( !user.validPassword(password, user) ){
                //password mis-match
                done(null, false, req.flash('errors', true));
            } else {
                //username and password match, log the user.
                done(null, user);
            }

        }, function( err ){
            logging.error( err );
            done(null, true);
        });
    },

    /**
     * Example serialize method for passport.js
     *
     * @param user
     * @param done
     */
    serializeUser: ( user, done ) => {
        QueriesUser.findOneById( user.id, ( err, user ) => {
            console.log( err, user );
            done(err, user.id);
        } );
    },

    /**
     * Deserialize method for passport.js
     *
     * @param id
     * @param done
     */
    deserializeUser: ( id, done ) => {
        QueriesUser.findOneById( id, ( err, user ) => {
            done(err, user);
        } );
    }
};