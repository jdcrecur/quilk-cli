/**
 * unify the json output of any response with jsonFail and jsonSuccess methods
 */
module.exports = function(){
    return function(req, res, next) {

        res.jsonFail = function (data) {
            return res.json({
                success: false,
                payload: data
            })
        };

        res.jsonSuccess = function (data) {
            return res.json({
                success: true,
                payload: data
            });
        };

        next();
    };
};