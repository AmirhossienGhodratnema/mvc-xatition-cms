const controller = require('app/http/controllers/controller');
const Category = require('./../../../models/category')



module.exports = new class CategoryController extends controller {

    // Show main page
    async index(req, res, next) {
        try {
            let page = req.query.page || 1;
            let category = await Category.paginate({}, { page, sort: { parent: null }, limit: 20, populate: 'parent' });
            return res.render('admin/category', { title: 'دسته‌ها', category });
        } catch (err) {
            next(next);
        };
    };


    // Create page
    async create(req, res, next) {
        try {
            let category = await (await Category.find({ parent: null }))
            return res.render('admin/category/create', { title: 'دسته جدید', category });
        } catch (err) {
            next(err);
        };
    };


    // Create filed
    async store(req, res, next) {
        try {

            let result = await this.ValidationData(req);
            if (result) return this.Back(req, res);
            const newCategory = await new Category({
                name: req.body.name,
                parent: req.body.parent == 'none' ? null : req.body.parent
            });
            await newCategory.save();
            return res.redirect('/admin/category');
        } catch (err) {
            next(err);
        };
    };


    // Edit page
    async edit(req, res, next) {
        try {
            let category = await Category.findById(req.params.id )
            let categories = await Category.find({ parent: null });
            // return res.json(categories)

            return res.render('admin/category/edit', { title: 'ویرایش خرید‌', category, categories });
        } catch (err) {
            next(err);
        };
    };


    // Update filed
    async update(req, res, next) {
        try {
            let status = await this.ValidationData(req);
            if (status) this.Back(req, res);
            await Category.findByIdAndUpdate(req.params.id, { $set: { ...req.body } });
            return res.redirect('/admin/category');
        } catch (err) {
            next(err);
        };
    };


    // Delete filed
    async distroy(req, res, next) {
        try {
            let category = await Category.findOne({ _id: req.params.id }).populate('childs').exec();
            await category.childs.forEach(async item => {
                await item.remove();
            });
            await category.remove();
            return res.redirect('/admin/category');
        } catch (err) {
            next(err);
        };
    };
};
