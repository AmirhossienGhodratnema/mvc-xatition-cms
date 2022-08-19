const controller = require('app/http/controllers/controller');
const Payment = require('./../../../models/payment');
const moment = require('jalali-moment')



module.exports = new class PaymentController extends controller {

    // Show main page
    async index(req, res, next) {
        try {
            let page = req.query.page || 1;
            let payment = await Payment.paginate({}, {
                page, sort: { createdAt: -1 }, limit: 10, populate: [
                    {
                        path: 'user',
                        select: ['name', 'lastName']
                    },
                    {
                        path : 'course',
                        select : 'title'
                    }
                ]
            });

            // return res.json(payment)

            return res.render('admin/payment', { title: 'پرداختی‌ها', payment });
        } catch (err) {
            next(err);
        };
    };

}
