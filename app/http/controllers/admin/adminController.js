const controller = require('app/http/controllers/controller');
const Buy = require('./../../../models/buy')
const moment = require('jalali-moment')



class indexController extends controller {
    async index(req, res, next) {
        try {
            let buy = await Buy.find({});
            let price = [];
            let date = [];
            buy.forEach(item => {
                price.push(item.price);
                date.push(item.date);
            });
            return res.render('admin', { title: 'صفحه ادمین', price, date });
        } catch (err) {
            next(err);
        }
    }


    async uploadImage(req, res) {
        let image = req.file;
        res.json({
            'uploaded': 1,
            'filename': image.originalname,
            'url': `${image.destination}/${image.filename}`.substring(45)

        })
    }
}

module.exports = new indexController();