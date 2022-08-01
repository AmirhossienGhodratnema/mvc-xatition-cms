const Middleware = require("./middleware");


module.exports = new class RememberLogin extends Middleware {
    // Not access login and register route when loing user
    handel(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.originalUrl === '/auth/login' || '/auth/register')
                return res.redirect('/')
        }
        return next()
    }
}