const Controller = require('app/http/controllers/controller');
const User = require('./../../../models/user')
const PasswordReset = require('./../../../models/passwordReset');
const uniqueString = require('unique-string');
const bcrypt = require('bcrypt')



module.exports = new class PasswordResetController extends Controller {

    // Show view reset password
    index(req, res, next) {
        try {
            return res.render('auth/passwordReset', { title: 'ثبت پسورد جدید', token: req.params.id });
        } catch (err) {
            next(err);
        };
    };


    // Validation and register password user
    async registerPassword(req, res, next) {
        try {
            let result = await this.ValidationData(req);
            if (result) return this.Back(req, res);
            return this.register(req, res, next);
        } catch (ere) {
            next(err);
        };
    };


    // Register password user
    async register(req, res, next) {
        try {
            let field = await PasswordReset.findOne({ $and: [{ 'email': req.body.email }, { 'token': req.body.token }] })
            if (!field) {
                await req.flash('errors', 'خطایی رخ داده لطفا مجدد پسورد خود را بازیابی کنید.');
                return this.Back(req, res);
            }
            if (field && field.use) {
                await req.flash('errors', 'از این ادرس برای تغیر رمز عبور استفاده شده است.');
                return this.Back(req, res);
            };
            if (field && req.body.password !== req.body.confPassword) {
                await req.flash('errors', 'رمزها با هم مطابقت ندارند !');
                return this.Back(req, res);
            };

            bcrypt.hash(req.body.password, bcrypt.genSaltSync(15), async (err, hash) => {
                if (err) console.log('Error for hashing password register user ...!');

                let user = await User.findOneAndUpdate({ email: field.email }, { password: hash });
                if (!user) {
                    await req.flash('errors', 'چنین کاربری وجود ندارد');
                    return this.Back(req, res);
                };
                next();
            });
            // await field.updateOne({ use: true });
            return res.redirect('/auth/login');
        } catch (err) {
            next(err);
        };
    };

    // Reset Url password
    // http://localhost:3000/auth/register-password/0eb011557447e6eac36d8b6186014f49
};

