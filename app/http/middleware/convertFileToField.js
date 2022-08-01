const Middleware = require("./middleware");


module.exports = new class ConvertFileToField extends Middleware {
    handel(req, res, next) {
        if (!req.file) {
            req.body.images = undefined;
        } else {
            req.body.images = req.file.originalname;
        }
        next()
    };
};