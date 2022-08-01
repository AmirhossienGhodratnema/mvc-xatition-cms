const Validation = require('./validation')
const { check } = require('express-validator/check')


module.exports = new class LoginValidation extends Validation {
    handel() {
        return [
            check('name')
                .not().isEmpty()
                .withMessage('نام محصول نمی تواند خالی باشد !'),

            check('price')
                .not().isEmpty()
                .withMessage('قیمت نمیتواند خالی باشد !'),

            check('date')
                .not().isEmpty()
                .withMessage('تاریخ الزامی است !'),

            check('number')
                .not().isEmpty()
                .withMessage('تعداد یا وزن کالا الزامی است !'),
        ]
    }
}