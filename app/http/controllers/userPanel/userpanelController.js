const controller = require('app/http/controllers/controller');
const Episode = require('./../../../models/episode')
const Assessment = require('./../../../models/assessment')
const moment = require('jalali-moment')

module.exports = new class UserPanelController extends controller {

    // View main page
    async index(req, res, next) {
        try {
            let episode = await Episode.find({ user: req.user.id }).populate([
                {
                    path: 'user',
                    select: ['name', 'lastName', 'email', 'number', 'createdAt']
                },
                {
                    path: 'course',
                    select: 'title'
                }
            ])
            let user = await req.user
            let assessment = await Assessment.find({ user: req.user.id })
            let number = [];
            let date = [];
            await assessment.forEach(item => {
                number.push(item.number);
                date.push(item.date);
            });

            // return res.json(episode)
            return res.render('userPanel', { title: 'پنل کاربری', number, date, episode, user });
        } catch (err) {
            next(err);
        };
    };


    async class(req, res, next) {
        try {
            let episode = await Episode.find({ user: req.user.id }).populate([
                {
                    path: 'user',
                    select: ['name', 'lastName']
                },
                {
                    path: 'course',
                    select: 'title'
                }
            ])
            let user = await req.user
            let assessment = await Assessment.find({ user: req.user.id, class: req.params.id })
            let number = [];
            let date = [];
            console.log(moment().format('jYYYY/jM/jD'))
            await assessment.forEach(item => {
                number.push(item.number);
                date.push(item.date);
            });

            return res.render('userPanel/singleAnalyze', { title: 'آنالیز', number, date, episode, user });
        } catch (err) {
            next(err);
        };
    };


    works(req, res, next) {
        try {
            return res.render('userPanel/work', { title: 'کارها' });
        } catch (err) {
            next(err);
        };
    };



    async shopingList(req, res, next) {
        try {
            let page = req.query.page || 1;
            let buyList = await Buy.paginate({ user: req.user.id }, { page, sort: { createdAt: 1 }, limit: 15, populate: 'user' });
            return res.render('userPanel/shopingList', { title: 'لیست خریدها', buyList });
        } catch (err) {
            next(err);
        };
    };



    async addUserBuy(req, res, next) {
        try {
            let result = await this.ValidationData(req);
            if (result) return this.Back(req, res);
            const newBuy = await new Buy({
                user: req.user._id,
                ...req.body
            })
            await newBuy.save(err => {
                if (err) return done(err, false, req.flash('errors', 'عملیات ناموفق بود دوباره امتحان کنید'))
            });
            return res.redirect('/user-panel')
        } catch (err) {
            next(err);
        }
    }


    // Delete filed user panel
    async distroy(req, res, next) {
        try {
            let buy = await Buy.findOne({ _id: req.params.id });
            await buy.remove();
            return res.redirect('/user-panel/shopingList');
        } catch (err) {
            next(err);
        };
    };



    async vip(req, res, next) {
        try {

            return res.render('userPanel/vip', { title: 'خرید اکانت ویژه' });
        } catch (er) {
            next(err);
        };
    };
};
