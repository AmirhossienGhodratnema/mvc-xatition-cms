const Middleware = require("./middleware");
const User = require('./../../models/user');



module.exports = new class RememberLogin extends Middleware {
    // In the hands of repairs 
    async handel(req, res, next) {
        if (! await req.isAuthenticated()) {
            return next();
        }
        next();
    }
}