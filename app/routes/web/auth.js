const express = require('express');
const router = express.Router();
const passport = require('passport');


// Controllers
const LoginController = require('app/http/controllers/auth/loginController');
const RegisterController = require('app/http/controllers/auth/registerController');
const ForgetPassController = require('../../http/controllers/auth/forgatPassController');
const PasswordResetController = require('../../http/controllers/auth/passwordResetController');


// Layout view register and login
router.use((req, res, next) => {
    res.locals.layout = "auth/master";
    next();
});


// Validations
const RegisterValidation = require('./../../validations/registerValidation')
const LoginValidation = require('./../../validations/loginValidation')
const ForgetPassValidation = require('./../../validations/forgetPassValidation')
const PasswordResetValidation = require('./../../validations/passwordResetValidation')


// Middelware
const NotLoadPage = require('./../../http/middleware/notLoadPage');


// Login router
router.get('/login', NotLoadPage.handel, LoginController.index);
router.post('/login', LoginValidation.handel(), LoginController.LoginProccess);


// Register router
router.get('/register', NotLoadPage.handel, RegisterController.index);
router.post('/register', RegisterValidation.handel(), RegisterController.registerProccess);

// Password reset
router.get('/password-reset', ForgetPassController.index);
router.post('/password-reset', ForgetPassValidation.handel(), ForgetPassController.resetPassword);

// Register password reset
router.get('/register-password/:id', PasswordResetController.index);
router.post('/register-password', PasswordResetValidation.handel(), PasswordResetController.registerPassword);

// Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/auth/register', failureFlash: true, }), (req, res, next) => {
});


module.exports = router;