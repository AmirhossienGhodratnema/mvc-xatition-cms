const controller = require('app/http/controllers/controller');
const Comment = require('./../../../models/comment');

module.exports = new class CommentController extends controller {

    // Show comment appreved false
    async index(req, res, next) {
        try {
            let page = req.query.page || 1;
            let comments = await Comment.paginate({ approved: false }, {
                page, sort: { createdAt: -1 }, limit: 10, populate: [
                    {
                        path: 'user',
                        select: ['name', 'lastName']
                    },
                    {
                        path: 'course',
                        select: 'title'
                    }
                ]
            });
            if (!comments) throw new Error('چنین دوره ای وحود ندارد');
            // return res.json(comments);
            return res.render('admin/comment', { title: 'کامنت‌ها', comments });
        } catch (err) {
            next(err);
        };
    };


    // Update approved comment.
    async approved(req, res, next) {
        try {
            let comment = await Comment.findById(req.params.id);
            // return res.json(comment.approved)
            comment.approved = await !comment.approved;
            comment.save(err => {
                if (err) this.Error('خطایی رخ داده لطفا محدد امتحان کنید', 403)
            })
            return this.Back(req, res);
        } catch (err) {
            next(err);
        };
    };


    // Show comments approved true
    async approvedComments(req, res, next) {
        try {
            let page = req.query.page || 1;
            let comments = await Comment.paginate({ approved: true }, {
                page, sort: { createdAt: -1 }, limit: 10, populate: [
                    {
                        path: 'user',
                        select: ['name', 'lastName']
                    },
                    {
                        path: 'course',
                        select: 'title'
                    }
                ]
            });
            if (!comments) throw new Error('چنین دوره ای وحود ندارد');
            // return res.json(comments);
            return res.render('admin/comment/approvedComments', { title: 'کامنت‌های تایید شده', comments })
        } catch (err) {
            next(err);
        };
    };


    // Delete comment
    async distroy(req, res, next) {
        try {
            await this.IdMongoId(req.params.id);
            let comment = await Comment.findOne({ _id: req.params.id });
            if (!comment) this.Error('چنین دوره‌ای وجود ندارد.', 404)
            await comment.remove();
            return this.Back(req, res);
        } catch (err) {
            next(err);
        };
    };
};