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
                .withMessage('قیمت نمیخواند خالی باشد !'),

            check('date')
                .not().isEmpty()
                .withMessage('تاریخ الزامی است !'),

            check('number')
                .not().isEmpty()
                .withMessage('تعداد یا وزن کارا الزامی است !'),

            check('nameStore')
                .not().isEmpty()
                .withMessage('نام فروش گاه الزامی است'),
        ]
    }
}