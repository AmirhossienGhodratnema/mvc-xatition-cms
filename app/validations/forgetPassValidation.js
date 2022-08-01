
const Validation = require('./validation')
const { check } = require('express-validator/check')


module.exports = new class ForgetPassValidation extends Validation {
    handel() {
        return [
            check('email')
                .not().isEmpty()
                .withMessage('ایمیل نمیتواند خالی باشد !'),
        ]
    }
}