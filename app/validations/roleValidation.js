const Validation = require('./validation')
const { check } = require('express-validator/check')
const Role = require('./../models/role');



module.exports = new class RoleValidation extends Validation {
    handel() {
        return [
            check('name')
                .isLength({ min: 3 })
                .withMessage('نام نمیتواند کم تر از 3 کاراکتر باشد')
                .custom(async (value, { req }) => {
                    let permission = await Role.findById(req.params.id);
                    let getpermission = await Role.findOne({ name: req.body.name });
                    if (req.query._method === 'PUT') {
                        if (getpermission.name == value) return
                    };
                    if (getpermission) {
                        throw new Error('نام تکراری است !')
                    };
                }),

            check('lable')
                .isLength({ min: 3 })
                .withMessage('لیبل نمیتواند کم تر از 3 کاراکتر باشد')
                .custom(async (value, { req }) => {
                    let permission = await Role.findById(req.params.id);
                    let getpermission = await Role.findOne({ lable: req.body.lable })
                    if (req.query._method === 'PUT') {
                        if (getpermission.lable == value) return
                    };
                    if (getpermission) {
                        throw new Error('لیبل تکراری است !')
                    };
                }),

            check('permission')
                .not().isEmpty()
                .withMessage('سطح دسترسی نمیتواند خالی باشد !'),

        ]
    };
};