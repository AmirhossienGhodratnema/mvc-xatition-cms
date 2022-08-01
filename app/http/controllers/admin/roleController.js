const controller = require('app/http/controllers/controller');
const Premission = require('./../../../models/premission');
const Role = require('./../../../models/role');




module.exports = new class RoleController extends controller {

    // Show main page
    async index(req, res, next) {
        try {
            let page = req.query.page || 1
            let roles = await Role.paginate({}, { page, sort: { createdAt: 1 }, limit: 10 });
            // return res.json(roles)
            return res.render('admin/role', { title: 'سطوح دسترسی', roles })
        } catch (err) {
            next(err);
        };
    };


    // Create page
    async create(req, res, next) {
        try {
            let permissions = await Premission.find({});
            return res.render('admin/role/create', { title: 'اجازه دسترسی جدید', permissions });
        } catch (err) {
            next(err);
        };
    };


    // Create filed
    async store(req, res, next) {
        try {

            let result = await this.ValidationData(req)
            if (result) return this.Back(req, res);

            const newRole = await new Role({ ...req.body });
            await newRole.save()

            // await newRole.save(err => {
            //     if (err) req.flash('errors', 'عملیات ناموفق بود دوباره امتحان کنید');
            // });
            return res.redirect('/admin/roles');
        } catch (err) {
            next(err)
        };
    };


    // Edit page
    async edit(req, res, next) {
        try {
            let role = await Role.findById(req.params.id)
            let permissions = await Premission.find({})
            return res.render('admin/role/edit', { title: 'ویرایش سطح دسترسی', role, permissions });
        } catch (err) {
            next(err);
        }
    }


    // Update filed
    async update(req, res, next) {
        try {
            let status = await this.ValidationData(req);
            if (status) return this.Back(req, res);
            await Role.findByIdAndUpdate(req.params.id, { $set: { ...req.body } });
            return res.redirect('/admin/roles');
        } catch (err) {
            next(err);
        }
    }


    // Delete filed
    async distroy(req, res, next) {
        try {
            let role = await Role.findById(req.params.id);
            await role.remove();
            return res.redirect('/admin/roles');
        } catch (err) {
            next(err);
        }
    }
}
