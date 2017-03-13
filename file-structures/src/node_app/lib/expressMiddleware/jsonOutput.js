/**
 * unify the json output of any response with jsonFail and jsonSuccess methods
 */
module.exports = () => {
    return (req, res, next) => {

        /**
         * Error json output
         * @param errObj (optional)
         * @returns {*}
         */
        res.jsonFail =  ( errObj ) => {
            errObj = errObj || {};
            return res.json({
                success : false,
                data   : errObj
            })
        };

        /**
         * Success json output
         * @param data
         * @returns {*}
         */
        res.jsonSuccess = ( data ) => {
            data = data || {};
            return res.json({
                success: true,
                data: data
            });
        };

        /**
         * Accepts a promise and passes onto the success or fail options above
         * @param p
         * @returns {*}
         */
        res.jsonPromise = (p) => {
            return p.then(res.jsonSuccess, res.jsonFail);
        };

        next();
    };
};