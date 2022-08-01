const Middleware = require("./middleware");


module.exports = new class IfNotAuth extends Middleware {
    // Not access admin route
    handel(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/')
            return next()
        }
        return next()
    }
}