module.exports = function(req, res, next) {
    res.sendHttpError = function(err) {
        res.status(err.status);
        if (req.xhr) {
            res.json({
                error : {
                    code : err.status,
                    message : err.message
                }
            });
        } else {
            res.json(err);
        }
    };
    next();
};
