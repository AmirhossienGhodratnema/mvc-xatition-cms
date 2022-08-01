
const Validation = require('./validation')
const { check } = require('express-validator/check')


module.exports = new class LoginValidation extends Validation {
    handel() {
        return [
            check('email')
                .not().isEmpty()
                .withMessage('ایمیل نمیتواند خالی باشد !'),

            check('email')
                .isEmail()
                .withMessage('ایمیل را به درستی وارد کنید !'),

            check('password')
                .isLength({ min: 8 })
                .withMessage('رمز عبور نمیتواند کم تر از 8 کاراکتر باشد !'),
        ]
    }
}