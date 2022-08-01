const Validation = require('./validation')
const { check } = require('express-validator/check')
const Course = require('./../models/course');
const path = require('path')



module.exports = new class CourseValidation extends Validation {
    handel() {
        return [

            check('title')
                .not().isEmpty()
                .withMessage('عنوان نمیتواند خالی بماند')
                .custom(async (value, { req }) => {
                    let course = await Course.findOne({ slug: this.slug(value) });
                    let getCourse = await Course.findOne({ _id: req.params.id })
                    if (req.query._method === 'put') {
                        if (getCourse.title == value) return
                    };
                    if (course) {
                        throw new Error('این اسلاگ وجود دارد')
                    }
                }),

            check('images')
                .custom(async (value, { req }) => {

                    let course = await Course.findOne({ slug: this.slug(value) });
                    let getCourse = await Course.findOne({ _id: req.params.id });
                    if (req.query._method === 'put') {
                        if (getCourse.title == value) return
                    };

                    if (!value) throw new Error('وارد کردن تصوبر الزامی است !');

                    let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
                    if (!fileExt.includes(path.extname(value))) throw new Error('پسود مناسب را انتخاب کنید (png - jpg - svg - jpeg)')

                }),

            check('description')
                .isLength({ min: 20 })
                .withMessage('متن دوره نمیتواند کمتر از 20 کاراکتر باشد'),

            check('type')
                .not().isEmpty()
                .withMessage('نوع دوره نمیتواند خالی بماند'),

            check('price')
                .not().isEmpty()
                .withMessage('قیمت نمیتواند خالی بماند'),

            check('tags')
                .not().isEmpty()
                .withMessage('تگ را وارد کنید'),

        ]
    };


    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-")
    };
};