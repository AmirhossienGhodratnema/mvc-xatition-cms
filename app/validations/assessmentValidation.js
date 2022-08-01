const Validation = require('./validation')
const { check } = require('express-validator/check')
const Course = require('./../models/course');
const path = require('path')



module.exports = new class AssessmentValidation extends Validation {
    handel() {
        return [
            check('number')
                .not().isEmpty()
                .withMessage('نمره نمیتواند خالی باشد.'),

            check('date')
                .not().isEmpty()
                .withMessage('تاریخ الزامی است.'),
        ]
    };


    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-")
    };
};