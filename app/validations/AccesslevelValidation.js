const Validation = require('./validation')
const { check } = require('express-validator/check')
const Permission = require('./../models/premission');



module.exports = new class AccesslevelValidation extends Validation {
    handel() {
        return [
            check('name')
                .isLength({ min: 3 })
                .withMessage('نام نمیتواند کم تر از 3 کاراکتر باشد')
                .custom(async (value, { req }) => {
                    let permission = await Permission.findById(req.params.id);
                    let getpermission = await Permission.findOne({ name: req.body.name });
                    if (req.query._method === 'PUT') {
                        if (permission.name == value) return
                    };
                    if (getpermission) {
                        throw new Error('نام تکراری است !')
                    };
                }),

            check('lable')
                .isLength({ min: 3 })
                .withMessage('لیبل نمیتواند کم تر از 3 کاراکتر باشد')
                .custom(async (value, { req }) => {
                    let permission = await Permission.findById(req.params.id);
                    let getpermission = await Permission.findOne({ lable: req.body.lable })
                    if (req.query._method === 'PUT') {
                        if (permission.lable == value) return
                    };
                    if (getpermission) {
                        throw new Error('لیبل تکراری است !')
                    };
                }),
        ]
    };


};