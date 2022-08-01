const controller = require('app/http/controllers/controller');
const Buy = require('./../../../models/buy')
const moment = require('moment')




module.exports = new class buyController extends controller {

    // Show main page
    async index(req, res, next) {
        try {
            let page = req.query.page || 1;
            let buy = await Buy.paginate({}, { page, sort: { createdAt: -1 }, limit: 20, populate: 'user' });
            let price = [];
            await buy.docs.forEach(item => {
                price.push(item.price);
            });
            return res.render('admin/buy', { title: 'خرید ها', buy, price });
        } catch (err) {
            next(next);
        };
    };


    // Create page
    async create(req, res, next) {
        try {
            return res.render('admin/buy/create', { title: 'ایجاد خرید جدید' });
        } catch (err) {
            next(err);
        };
    };


    // Create filed
    async store(req, res, next) {
        try {
            let result = await this.ValidationData(req);
            if (result) return this.Back(req, res);
            const newBuy = await new Buy({
                user: req.user._id,
                ...req.body
            });
            await newBuy.save(err => {
                if (err) return done(err, false, req.flash('errors', 'عملیات ناموفق بود دوباره امتحان کنید'));
            });
            return res.redirect('/admin/buy');
        } catch (err) {
            next(err);
        };
    };


    // Edit page
    async edit(req, res, next) {
        try {
            let buy = await Buy.findOne({ _id: req.params.id });
            return res.render('admin/buy/edit', { title: 'ویرایش خرید‌', buy }); F
        } catch (err) {
            next(err);
        };
    };


    // Update filed
    async update(req, res, next) {
        try {
            let status = await this.ValidationData(req);
            if (status) this.Back(req, res);
            await Buy.findByIdAndUpdate(req.params.id, { $set: { ...req.body } });
            return res.redirect('/admin/buy');
        } catch (err) {
            next(err);
        };
    };


    // Delete filed
    async distroy(req, res, next) {
        try {
            let buy = await Buy.findOne({ _id: req.params.id });
            await buy.remove();
            return res.redirect('/admin/buy');
        } catch (err) {
            next(err);
        };
    };
};
