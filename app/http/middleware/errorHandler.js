const middleware = require('./middleware');
const config = require('./../../config');

module.exports = new class ErrorHandler extends middleware {
    async error404(req, res, next) {
        try {
            res.statusCode = 404
            throw new Error('چنین صفحه ای وجود ندارد')
        } catch (err) {
            next(err);
        }
    }

    async handler(err, req, res, next) {
        const statusCode = err.message || 500;
        const message = err.message || '';
        const stack = err.stack || '';

        let layouts = {
            layout: 'errors/master',
            extractScripts: false,
            extractStyle: false,
        };

        if (config.debug) return res.render('errors/stack', { ...layouts, title: 'خطا', message, stack, statusCode });


        return res.render('errors/404', { ...layouts, title: '404' })
    }
};