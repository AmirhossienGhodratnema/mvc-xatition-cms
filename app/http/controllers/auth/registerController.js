const Controller = require('app/http/controllers/controller');
const passport = require('passport');


module.exports = new class RegisterController extends Controller {

    // Register view
    index(req, res, next) {
        try {
            return res.render('auth/register', { title: 'ثبت نام', captcha: this.recaptcha.render() });

        } catch (err) {
            next(err);
        };
    };


    // Validation form and register new user
    async registerProccess(req, res, next) {
        try {
            await this.RecaptchaValidation(req, res);
            let resutl = await this.ValidationData(req);
            if (resutl) return this.Back(req, res);
            await this.register(req, res, next);
        } catch (err) {
            next(err);
        };
    };


    // Create new user
    async register(req, res, next) {
        try {
            await passport.authenticate('local.register', {
                failureRedirect: '/auth/register',
                successRedirect: '/',
                failureFlash: true,
            })(req, res, next);
        } catch (err) {
            next(err);
        };
    };
};

