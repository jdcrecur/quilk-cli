/**
 * Express middleware to control the http headers
 * @returns {Function}
 */
module.exports = () => {
    return (req, res, next) => {
        var requestOrigin = req.header('Origin');
        if (requestOrigin === null || typeof requestOrigin === 'undefined') {
            requestOrigin = '*';
        }
        res.header('Access-Control-Allow-Origin', requestOrigin);
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Headers');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Expose-Headers', 'token-authorization');
        next();
    };
};