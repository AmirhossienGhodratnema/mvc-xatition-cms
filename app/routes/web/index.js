const express = require('express');
const router = express.Router();
const i18n = require('i18n');
const config = require('./../../config')


router.use((req, res, next) => {
    try {
        let lang = req.signedCookies.lang;
        if (i18n.getLocales().includes(lang)) {
            req.setLocale(lang)
        } else {
            req.setLocale(i18n.getLocale());
        }
        next()
    } catch (err) {
        next(err);
    }
})

// Middleware
const IfNotAuth = require('./../../http/middleware/ifNotAuth');
const NotAdmin = require('./../../http/middleware/notAdmin');
const ErrorHandler = require('./../../http/middleware/errorHandler');

// Router
const adminRouter = require('app/routes/web/admin');
const UserPanel = require('./userPanel');



// Home Router
const homeRouter = require('app/routes/web/home');
const { lang } = require('moment');
router.use('/', homeRouter);


// Admin router
router.use('/admin', IfNotAuth.handel, NotAdmin.handel, adminRouter);


// User panel
router.use('/user-panel', IfNotAuth.handel, UserPanel);



// Logout
router.get('/logout', (req, res, next) => {
    req.logOut();
    res.clearCookie('Remember_token');
    return res.redirect('/');
})


router.get('/lang/:lang', (req, res, next) => {
    let lang = req.params.lang;
    if (i18n.getLocales().includes(lang)) {
        res.cookie('lang', lang, {
            maxAge: 1000 * 60 * 60 * 24 * 90,
            signed: true
        })
    }
    return res.redirect(req.header('Referer') || '/');
})






router.all('*', ErrorHandler.error404)

router.use(ErrorHandler.handler);




module.exports = router;