const Middleware = require("./middleware");


module.exports = new class RememberLogin extends Middleware {
    // Not access login and register route when loing user
    handel(req, res, next) {
        if (req.isAuthenticated() && req.user.admin == true) {
            // res.redirect('/admin')
            return next()
        }
        return res.redirect('/')
    }
}