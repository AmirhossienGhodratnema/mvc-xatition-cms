
const Validation = require('./validation')
const { check } = require('express-validator/check')


module.exports = new class CommentValidation extends Validation {
    handel() {
        return [
            check('description')
                .not().isEmpty().isLength({ min: 10 })
                .withMessage('کامنت نمیتواند کم تر از 10 کاراکتر باشد !'),
        ]
    }
}