const Controller = require('app/http/controllers/controller');
const User = require('./../../../models/user')
const PasswordReset = require('./../../../models/passwordReset');
const uniqueString = require('unique-string');
const nodeMaler = require('nodemailer')


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
            let transporter = await nodeMaler.createTransport({
                host: 'smtp.mailtrap.io',
                port: 2525,
                secure: false,
                auth: {
                    user: 'c408c8e2144e5e',
                    pass: '672d1ed2cccfe2',
                },
            })
            let info = await transporter.sendMail({
                from: 'amirhosseinghodratnema@gmail.com', // sender address
                to: `${newPasswordReset.email}`, // list of receivers
                subject: 'ریسیت کردن پسورد', // Subject line
                text: "Hello world?", // plain text body
                html: `<h2>ریست کردن پسورد</h2>
                        <p>برای ریست کردن پسورد بر روی لینک زیر کلیک کنید.</p>
                        <a href="http://amirhosseinghodratnema.ir/auth/register-password/${newPasswordReset.token}">http://amirhosseinghodratnema.ir/auth/register-password/${newPasswordReset.token}</a>
                `, // html body
            });

            await transporter.sendMail(info, (err, info) => {
                if (err) console.log('Error send mail', err)
                console.log('Message send', info.messageId)
            })

            this.Alert(req, {
                title: 'تایید',
                icon: 'success',
                message: 'برای دریافت لینک تغیر پسورد به ادمین مراجعه کنید',
                button : 'متوجه شدم !'
            });

            return res.redirect('/')
        } catch (err) {
            next(err);
        };
    };
};
