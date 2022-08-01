const Validation = require('./validation')
const { check } = require('express-validator/check')


module.exports = new class CategoryValidation extends Validation {
    handel() {
        return [
            check('name')
                .not().isEmpty()
                .withMessage('نام دسته نمی تواند خالی باشد !'),
        ];
    };
};