const controller = require('app/http/controllers/controller');
const Episode = require('./../../../models/episode');
const Course = require('./../../../models/course');
const Assessment = require('./../../../models/assessment');
const Premission = require('./../../../models/premission');




module.exports = new class AssessmentController extends controller {

    // Show main page
    async index(req, res, next) {
        try {
            let page = req.query.page || 1
            let course = await Course.paginate({}, { page, sort: { createdAt: 1 }, limit: 10 })
            return res.render('admin/assessment', { title: 'ارزیابی', course })
        } catch (err) {
            next(err);
        };
    };


    // indexSingle page
    async indexSingle(req, res, next) {
        try {
            let episode = await Episode.find({ course: req.params.id }).populate([
                {
                    path: 'user',
                    select: ['name', 'lastName']
                },
                {
                    path: 'course',
                }
            ]);


            return res.render('admin/assessment/indexSingle', { title: 'لیست ارزیابی کلاس ', episode });
        } catch (err) {
            next(err);
        };
    };


    // Create page
    async create(req, res, next) {
        try {
            let user = await Episode.findById(req.params.id).populate([
                {
                    path: 'user',
                    select: ['name', 'lastName']
                },
                {
                    path: 'course',
                    select: ['title']
                }
            ]);
            let assessment = await Assessment.find({ user: user.user.id , class : user.course.id }).populate([
                {
                    path: 'user',
                    select: ['name', 'lastName']
                }
            ]);
            return res.render('admin/assessment/create', { title: 'ارزیابی جدید', user, assessment });
        } catch (err) {
            next(err);
        };
    };


    // Create filed
    async store(req, res, next) {
        try {
            let result = await this.ValidationData(req)
            if (result) return this.Back(req, res);
            const newAssessment = await new Assessment({ ...req.body });
            await newAssessment.save(err => {
                if (err) req.flash('errors', 'عملیات ناموفق بود دوباره امتحان کنید');
            });
            return this.Back(req, res)
        } catch (error) {
            next(err)
        };
    };


    // Edit page
    async edit(req, res, next) {
        try {
            let assessment = await Assessment.findOne({ _id: req.params.id });
            return res.render('admin/assessment/edit', { title: 'ویرایش اجازه دسترسی', assessment });
        } catch (err) {
            next(err);
        }
    }


    // Update filed
    async update(req, res, next) {
        try {
            let status = await this.ValidationData(req);
            if (status) return this.Back(req, res);
            await Premission.findByIdAndUpdate(req.params.id, { $set: { ...req.body } });
            return res.redirect('/admin/premission');
        } catch (err) {
            next(err);
        }
    }


    // Delete filed
    async distroy(req, res, next) {
        try {
            let assessment = await Assessment.findOne({ _id: req.params.id });
            await assessment.remove();
            return this.Back(req, res)
        } catch (err) {
            next(err);
        }
    }
}
