
const Validation = require('./validation')
const { check } = require('express-validator/check')


module.exports = new class RegisterValidation extends Validation {
    handel() {
        return [
            check('name')
                .isLength({ min: 3 })
                .withMessage('نام نمیتواند کم تر از 3 کاراکتر باشد !'),

            check('lastName')
                .isLength({ min: 3 })
                .withMessage('نام خانوادگی نمیتواند کم تر از 3 کاراکتر باشد !'),

            check('email')
                .isEmail()
                .withMessage('فرمت ایمیل را به درستی وارد کنید !'),

            check('password')
                .isLength({ min: 8 })
                .withMessage('رمز عبور نمیتواند کم تر از 8 کاراکتر باشد !'),
        ]
    }
}