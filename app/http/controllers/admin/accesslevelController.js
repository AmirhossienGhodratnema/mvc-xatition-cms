const controller = require('app/http/controllers/controller');
const Role = require('./../../../models/role');
const Premission = require('./../../../models/premission');




module.exports = new class AccesslevelController extends controller {

    // Show main page
    async index(req, res, next) {
        try {
            let page = req.query.page || 1
            let premission = await Premission.paginate({}, { page, sort: { createdAt: 1 }, limit: 10 })
            return res.render('admin/premission', { title: 'اجازه دسترسی', premission })
        } catch (err) {
            next(err);
        };
    };


    // Create page
    async create(req, res, next) {
        try {
            return res.render('admin/premission/create', { title: 'اجازه دسترسی جدید' });
        } catch (err) {
            next(err);
        };
    };


    // Create filed
    async store(req, res, next) {
        try {
            let result = await this.ValidationData(req)
            if (result) return this.Back(req, res);
            const newPremission = await new Premission({ ...req.body });
            await newPremission.save(err => {
                if (err) req.flash('errors', 'عملیات ناموفق بود دوباره امتحان کنید');
            });
            return res.redirect('/admin/premission');
        } catch (error) {
            next(err)
        };
    };


    // Edit page
    async edit(req, res, next) {
        try {
            let premission = await Premission.findOne({ _id: req.params.id });
            return res.render('admin/premission/edit', { title: 'ویرایش اجازه دسترسی', premission });
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
            let premission = await Premission.findOne({ _id: req.params.id });
            await premission.remove();
            return res.redirect('/admin/premission');
        } catch (err) {
            next(err);
        }
    }
}
