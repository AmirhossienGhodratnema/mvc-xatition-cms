const Controller = require('app/http/controllers/controller');
const passport = require('passport');


module.exports = new class LoginController extends Controller {

    // View login page
    index(req, res, next) {
        try {
            return res.render('auth/login', { title: 'ورود', captcha: this.recaptcha.render() });
        } catch (err) {
            next(err);
        };
    };


    // Proccess validation and loign user
    async LoginProccess(req, res, next) {
        try {
            await this.RecaptchaValidation(req, res);
            let resutl = await this.ValidationData(req);
            if (resutl) return this.Back(req, res);
            await this.login(req, res, next);
        } catch (err) {
            next(err);
        };
    };


    // Proccess loign user
    async login(req, res, next) {
        try {
            await passport.authenticate('local.login', async (err, user) => {
                if (user) {
                    await req.logIn(user, (err) => {
                        if (err) return next(err);
                    });
                    return res.redirect('/');
                }
                return res.redirect('/auth/login');
            })(req, res, next);
        } catch (err) {
            next(err);
        };
    };
};
