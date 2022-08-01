const controller = require('app/http/controllers/controller');
const Course = require('./../../models/course')

module.exports = new class homeController extends controller {

    // View main page
    async index(req, res , next) {
        try {
            let courses = await Course.find({}).limit(3);
            // return res.json(courses)
            return res.render('index', { title: 'صفحه اصلی', user: req.user , courses });
        } catch (err) {
            next(err);
        };
    };
};