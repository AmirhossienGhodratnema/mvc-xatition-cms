const controller = require('app/http/controllers/controller');
const User = require('./../../../models/user');
const Role = require('./../../../models/role');
const moment = require('jalali-moment');



module.exports = new class UserController extends controller {
    async index(req, res, next) {
        try {
            let page = req.query.page || 1;
            let users = await User.paginate({}, { page, sort: { createdAt: -1 }, limit: 20, populate: 'user' });
            return res.render('admin/users', { title: 'کاربران', users });
        } catch (err) {
            next(err);
        };
    };

    async create(req, res, next) {
        try {
            return res.render('admin/users/create', { title: 'کاربر جدید' });
        } catch (err) {
            next(err);
        };
    };


    async store(req, res, next) {
        try {
            let result = await this.ValidationData(req);
            if (result) return this.Back(req, res);
            const newUser = await new User({ ...req.body });
            await newUser.save(err => {
                if (err) return done(err, false, req.flash('errors', 'عملیات ناموفق بود دوباره امتحان کنید'));
            });
            return res.redirect('/admin/user');
        } catch (err) {
            next(err);
        }
    }



    async distroy(req, res, next) {
        try {
            let buy = await User.findOne({ _id: req.params.id });
            await buy.remove();
            return res.redirect('/admin/user');
        } catch (err) {
            next(err);
        };
    };


    async changeAdmin(req, res, next) {
        try {

            let user = await User.findById(req.params.id).select(['name', 'lastName', 'admin']);

            user.admin = !user.admin;
            user.save();

            return this.Back(req, res);

        } catch (err) {
            next(err);
        }
    };

    async adminUser(req, res, next) {
        try {

            let page = req.query.page || 1;
            let users = await User.paginate({ admin: true }, { page, sort: { createdAt: -1 }, limit: 20 });

            return res.render('admin/users/admins', { title: 'لیست مدیران', users });
        } catch (err) {
            next(err);
        }
    };


    async addRoleForUser(req, res, next) {
        try {

            let user = await User.findById(req.params.id).select(['name', 'lastName', 'createdAt', 'birth' ,'roles'])
            let roles = await Role.find({});


            // return res.json(user)

            return res.render('admin/users/addRole', { title: 'دسترسی کاربران', user, roles })
        } catch (err) {
            next(err);
        };
    };


    async storeRoleForUser(req, res, next) {
        try {
            let user = await User.findById(req.params.id)
            // return res.json(req.body)

            await user.set({ roles: req.body.permission });
            await user.save();
            return res.redirect('/admin/user');
        } catch (err) {
            next(err);
        }
    }
};