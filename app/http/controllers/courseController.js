const controller = require('app/http/controllers/controller');
const path = require('path');
const Course = require('./../../models/course');
const Episode = require('./../../models/episode');
const User = require('./../../models/user');
const config = require('./../../config');
const bcrypt = require('bcrypt');
const user = require('../../models/user');
const res = require('express/lib/response');

module.exports = new class SingleController extends controller {

    // All course
    async index(req, res, next) {
        try {
            let page = req.query.page || 1;
            let courses = await Course.paginate({ lang: req.getLocale() }, {
                page, sort: { createdAt: 1 }, limit: 10, populate: [
                    {
                        path: 'user',
                        select: ['name', 'lastName']
                    },
                ]
            })

            if (!courses) throw new Error('چنین دوره ای وحود ندارد');
            return res.render('courses', { title: 'دوره‌ها', courses })
        } catch (err) {
            next(err);
        }
    }


    // Single page course.
    async single(req, res, next) {
        try {
            console.log()
            if(req.isAuthenticated()) {
                let course = await Course.findByIdAndUpdate(req.params.id, { $inc: { viewCount: 1 } }).populate([
                    {
                        path: 'user',
                        select: ['name', 'lastName']
                    },
                    {
                        path: 'episodes'
                    },
                    {
                        path: 'comment',
                        match: { parent: null, approved: true },
                        populate: [
                            {
                                path: 'user',
                                select: ['name', 'lastName'],
                            },
                            {
                                path: 'comments',
                                match: { approved: true },
                                populate: [
                                    {
                                        path: 'user',
                                        select: ['name', 'lastName'],
                                    },
                                ],
                            },
                        ],
                    },
                ]);
    
                let checkRegisterClass = await req.user.registerClass(course.episodes, req.user.id);
    
                return res.render('single', { title: 'صفحه کلاس', course, checkRegisterClass });
            }

            return this.AlertAndBack(req, res, {
                title: 'ورود به حساب کاربری',
                icon : 'error',
                message: 'شما ابتدا باید وارد اکانت خود شوید.',
                button: 'تایید'
            });
            
            
        } catch (err) {
            next(err);
        };
    };




    // Secure download
    async download(req, res, next) {
        try {
            await this.IdMongoId(req.params.episode);
            let episode = await Episode.findById(req.params.episode);
            if (!episode) this.Error('چنین فایلی برای این جلسه وجود ندارد !', 404);
            if (! await this.checkHash(req, episode)) await this.Error('اعتبار لینک شما به پایان رسیده است !');
            let filePath = config.addres + '/public/donwload/' + episode.videoUrl;
            let dl = await res.download(filePath);
            console.log('Info for donwload video', dl);
            episode.downloadCount = await episode.downloadCount + 1;
            episode.save();
            return
        } catch (err) {
            next(err);
        };
    };


    async checkHash(req, episode) {
        let timeStamp = new Date().getTime();
        if (req.query.t < timeStamp) return false;
        let text = `#@%AFDG^ysd%&^$%#43FDSGAag234fadf${episode.id}${req.query.t}`
        return bcrypt.compareSync(text, req.query.mac)
    };



    // Course payment
    async payment(req, res, next) {
        try {
            await this.IdMongoId(req.body.course);
            let course = await Course.findById(req.body.course);
            if (!course) {
                this.AlertAndBack(req, res, {
                    title: 'خطا',
                    message: 'چنین دوره ای یافت نشد',
                    type: 'error'
                });
            }

            if (req.user.checkLearning(course)) {
                this.Alert(req, res, {
                    title: 'خطا',
                    message: 'شما قبلا در این دوره ثبت نام کرده اید',
                    type: 'info'
                });
            };

            if (course.price == 0 && (course.type == 'vip' || course.type == 'free')) {
                console.log('این دوره مخصوص اعضای ویژه یا رایگان است و قابل خربد نست')
                return;
            };

            return res.json(req.body);
        } catch (err) {
            next(err);
        }
    }
};