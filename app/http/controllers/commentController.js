const controller = require('app/http/controllers/controller');
const Comment = require('./../../models/comment');

module.exports = new class CommentController extends controller {

    // Create comment
    async store(req, res, next) {
        try {
            let result = await this.ValidationData(req);
            if (result) return this.Back(req, res)
            const newComment = await new Comment({
                user: req.user.id,
                ...req.body,
            });
            await newComment.save(err => {
                if (err) req.flash('errors', 'عملیات ناموفق بود دوباره امتحان کنید');
            });
            this.AlertAndBack(req, res, {
                title: 'تایید',
                icon : 'success',
                message: 'پسام شما با موفقیت ارسال شد.',
                type: 'error'
            });
            // return this.Back(req, res);
        } catch (err) {
            next(err);
        };
    };
};