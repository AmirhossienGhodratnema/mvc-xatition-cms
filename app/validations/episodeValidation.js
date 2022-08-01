const Validation = require('./validation')
const { check } = require('express-validator/check')
const Course = require('../models/course');
const path = require('path')



module.exports = new class EpisodeValidation extends Validation {
    handel() {
        return [
            check('course')
                .not().isEmpty()
                .withMessage('دوره مورد نظر را انتخاب کنید !'),

            check('user')
                .not().isEmpty()
                .withMessage('عنوان یا نام دوره را ارد کنید !'),
        ]
    };


    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-")
    };
};