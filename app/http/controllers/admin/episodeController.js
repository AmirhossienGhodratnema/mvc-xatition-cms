const controller = require('app/http/controllers/controller');
const Episode = require('../../../models/episode');
const Courses = require('../../../models/course');
const User = require('../../../models/user');



module.exports = new class EpisodeController extends controller {

    // Show main page
    async index(req, res, next) {
        try {
            let page = req.query.page || 1;
            let episodes = await Episode.paginate({}, {
                page, sort: { createdAt: -1 }, limit: 10, populate: [
                    {
                        path: 'course',
                        select: ['title', 'user'],
                        populate: [
                            {
                                path: 'user',
                                select: ['name', 'lastName']
                            }
                        ]
                    },
                    {
                        path: 'user',
                        select: ['name', 'lastName']
                    }
                ]
            });


            if (!episodes) throw new Error('چنین دوره ای وحود ندارد');
            return res.render('admin/episode', { title: 'قسمت‌ها', episodes });
        } catch (err) {
            next(err);
        };
    };


    // 
    async specificParts(req, res, next) {
        try {
            let page = req.query.page || 1;
            let episodes = await Episode.paginate({ course: req.params.id }, {
                page, sort: { createdAt: 1 }, limit: 10, populate: [
                    {
                        path: 'course',
                        select: ['title', 'user'],
                        populate: [
                            {
                                path: 'user',
                                select: ['name', 'lastName']
                            }
                        ]
                    },
                    {
                        path : 'user',
                        select : ['name' , 'lastName']
                    }
                ]
            });
            // return res.json(episodes)
            return res.render('admin/episode/specificParts', { title: 'قسمت‌های مربوطه', episodes })
        } catch (err) {
            next(err);
        };
    };


    // Create page
    async create(req, res, next) {
        try {
            let courses = await Courses.find({}).select(['title']);
            let users = await User.find({}).select(['name', 'lastName'])
            return res.render('admin/episode/create', { title: 'دوره جدید', courses, users });
        } catch (err) {
            next(err);
        };
    };


    // Create filed
    async store(req, res, next) {
        try {
            let result = await this.ValidationData(req);
            if (result) return this.Back(req, res);
            let episode = await Episode.find({ user: req.body.user, course: req.body.course }).populate([
                {
                    path: 'user',
                    select: ['name', 'lastName']
                },
                {
                    path: 'course',
                    select: ['title']
                }
            ]);
            if (episode.length > 0) {
                console.log(episode[0])
                req.flash('errors', `${episode[0].user.lastName ? episode[0].user.name + ' ' + episode[0].user.lastName : episode[0].user.name} در ای کلاس ${episode[0].course.title} شرکت کرده است.`)
                this.Alert(req, res, {
                    title: 'خطا',
                    message: 'شما قبلا در این دوره ثبت نام کرده اید',
                    type: 'info'
                });
                return this.Back(req, res);
            }
            const newEpisode = await new Episode({ ...req.body });
            await newEpisode.save(err => {
                if (err) req.flash('errors', 'عملیات ناموفق بود دوباره امتحان کنید');
            });
            return res.redirect('/admin/episodes');
        } catch (err) {
            next(err);
        };
    };


    // Edit page
    async edit(req, res, next) {
        try {
            await this.IdMongoId(req.params.id);
            let episode = await Episode.findOne({ _id: req.params.id }).populate([
                {
                    path: 'user',
                    select: ['name', 'lastName']
                },
                {
                    path: 'course',
                    select: 'title'
                },
            ]);
            let users = await User.find({}).select(['name', 'lastName'])
            let courses = await Courses.find({}).select(['title']);

            // return res.json(episode)
            if (!episode) this.Error('چنین دوره‌ای وجود ندارد.', 404)
            return res.render('admin/episode/edit', { title: 'ویرایش قسمت‌ دوره', episode, courses, users });
        } catch (err) {
            next(err);
        };
    };


    // Update filed
    async update(req, res, next) {
        try {
            let result = await this.ValidationData(req);
            if (result) return this.Back(req, res);
            let episode = await Episode.findByIdAndUpdate(req.params.id, { $set: { ...req.body } });
            return res.redirect('/admin/episodes');
        } catch (err) {
            next(err);
        }
    }


    // Delete filed
    async distroy(req, res, next) {
        try {
            let address = req.header('Referer').slice(22)
            await this.IdMongoId(req.params.id);
            let course = await Episode.findOne({ _id: req.params.id });
            if (!course) this.Error('چنین دوره‌ای وجود ندارد.', 404)
            await course.remove();
            if (address == 'admin/episodes') return res.redirect('/admin/episodes');
            return this.Back(req, res);
        } catch (err) {
            next(err);
        };
    };
};
