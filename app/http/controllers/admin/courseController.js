const controller = require('app/http/controllers/controller');
const Course = require('./../../../models/course');
const Category = require('./../../../models/category');
const path = require('path')
const fs = require('fs');
const sharp = require('sharp');
const config = require('./../../../config')



module.exports = new class CourseController extends controller {

    // Show main page
    async index(req, res, next) {
        try {
            let page = req.query.page || 1;
            let courses = await Course.paginate({}, {
                page, sort: { createdAt: 1 }, limit: 10, populate: [{
                    path: 'user',
                    select: ['name', 'lastName']
                }]
            });



            if (!courses) throw new Error('چنین دوره ای وحود ندارد');
            return res.render('admin/course', { title: 'دوره‌ها', courses });
        } catch (err) {
            next(err);
        };
    };


    // Create page
    async create(req, res, next) {
        try {
            return res.render('admin/course/create', { title: 'دوره جدید' });
        } catch (err) {
            next(err);
        };
    };


    // Create filed
    async store(req, res, next) {
        try {
            let result = await this.ValidationData(req);
            if (result) fs.unlink(req.file.path, (err) => { })
            if (result) return this.Back(req, res);
            let { title, type, description, tags, price } = req.body;
            let images = await this.imageResize(req.file);
            const newCourse = await new Course({
                user: req.user.id,
                title,
                slug: this.slug(title),
                type,
                thumbnail: images['480'],
                images,
                description,
                tags,
                price
            });
            await newCourse.save(err => {
                if (err) req.flash('errors', 'عملیات ناموفق بود دوباره امتحان کنید');
            });
            return res.redirect('/admin/courses');
        } catch (err) {
            next(err);
        };
    };


    // Edit page
    async edit(req, res, next) {
        try {
            await this.IdMongoId(req.params.id);
            let category = await Category.find({})
            let course = await Course.findOne({ _id: req.params.id })

            // return res.json(course)
            if (!course) this.Error('چنین دوره‌ای وجود ندارد.', 404)
            return res.render('admin/course/edit', { title: 'ویرایش سطح دسترسی', course, category });
        } catch (err) {
            next(err);
        };
    };


    // Update filed
    async update(req, res, next) {
        try {
            let result = await this.ValidationData(req);
            if (result) fs.unlink(req.file.path, (err) => { });
            if (result) return this.Back(req, res);
            let objUpdateData = {};
            if (req.file) objUpdateData.images = await this.imageResize(req.file);
            await Course.findByIdAndUpdate(req.params.id, { $set: { ...req.body, ...objUpdateData } });
            return res.redirect('/admin/courses');
        } catch (err) {
            next(err);
        }
    }


    // Delete filed
    async distroy(req, res, next) {
        try {
            await this.IdMongoId(req.params.id);
            let course = await Course.findOne({ _id: req.params.id }).populate('episode').exec()
            if (!course) this.Error('چنین دوره‌ای وجود ندارد.', 404)
            if (course.episode) {
                course.episode.forEach(async item => {
                    await item.remove();
                });
            }

            // Delete iamges couser
            Object.values(course.images).map(async image => {
                fs.unlink(config.addres + 'public' + image, async (err) => {
                    if (err) {
                        console.log('Unlink image course', err)
                    }
                });
            });
            await course.remove();
            return res.redirect('/admin/courses');
        } catch (err) {
            next(err);
        };
    };


    // Resize upload image
    async imageResize(image) {
        try {
            let imageInfo = await path.parse(image.path);
            let addresImage = {};
            addresImage['orginal'] = await this.getUrlImage(image.path, image.filename);
            const resize = async size => {
                let imageName = `${imageInfo.name}-${size}-${imageInfo.ext}`;
                addresImage[size] = await this.getUrlImage(image.destination, imageName);
                await sharp(image.path)
                    .resize(size, null)
                    .toFile(`${image.destination}/${imageName}`)
            };
            await [1080, 720, 480].map(resize);
            return addresImage;
        } catch (err) {
            next(err);
        };
    };


    // Get addres image
    async getUrlImage(dir, name) {
        console.log('dir' , dir)
        console.log('name' , name)
        return dir + '/' + name;
    };


    // Create slug
    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-")
    };
};
