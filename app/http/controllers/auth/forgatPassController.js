const Controller = require('app/http/controllers/controller');
const User = require('./../../../models/user')
const PasswordReset = require('./../../../models/passwordReset');
const uniqueString = require('unique-string');



module.exports = new class ForgatPass extends Controller {

    // Show view forgat password
    index(req, res, next) {
        try {
            return res.render('auth/forgetPass',
                {
                    title: 'فراموشی رمز عبور',
                    // captcha: this.recaptcha.render()
                });
        } catch (err) {
            next(err);
        };
    };


    // Reset password prossecc
    async resetPassword(req, res, next) {
        try {
            // await this.RecaptchaValidation(req, res);
            let result = await this.ValidationData(req);
            if (result) return this.Back(req, res);
            this.sendLinkPass(req, res, next);
        } catch (err) {
            next(err);
        };
    };



    // Send link password email
    async sendLinkPass(req, res, next) {
        try {
            let user = await User.findOne({ 'email': req.body.email });
            if (!user) {
                req.flash('errors', 'چنین کاربری وجود ندارد !');
                return this.Back(req, res);
            }
            const newPasswordReset = await new PasswordReset({
                email: req.body.email,
                token: uniqueString(),
            })
            await newPasswordReset.save();
            // Send email
            return res.redirect('/');
        } catch (err) {
            next(err);
        };
    };
};
