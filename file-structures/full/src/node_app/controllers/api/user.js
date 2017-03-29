
module.exports = {

    /**
     * Returns public elements of the user object
     *
     * @returns {Promise}
     */
    getCurrent: ( req ) => {
        return new Promise(( resolve, reject ) => {
            if( req.user ){
                return resolve({
                    id: req.user.id,
                    username: req.user.local.email
                });
            }
            else {
                reject();
            }
        })
    }
};