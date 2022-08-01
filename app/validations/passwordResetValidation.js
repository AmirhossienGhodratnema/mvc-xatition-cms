
const Validation = require('./validation')
const { check } = require('express-validator/check')


module.exports = new class ForgetPassValidation extends Validation {
    handel() {
        return [
            check('token')
                .not().isEmpty().isLength({ min: 32, max: 32 })
                .withMessage('لطفا مجدد ارسال کنید !'),

            check('email')
                .not().isEmpty()
                .withMessage('ایمیل نمیتواند خالی باشد !'),

            check('password')
                .not().isEmpty()
                .withMessage('رمزعبور نمیتواند خالی باشد !'),

            check('confPassword')
                .not().isEmpty()
                .withMessage('تایید رمزعبور نمیتواند خالی باشد !'),
        ]
    }
}