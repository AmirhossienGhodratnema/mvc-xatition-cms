const express = require('express');
const router = express.Router();
const Auth = require('./auth');


// Controllers
const homeController = require('app/http/controllers/homeController');
const CourseController = require('../../http/controllers/courseController');
const CommentController = require('../../http/controllers/commentController');
const loginController = require('app/http/controllers/auth/loginController');
const registerController = require('app/http/controllers/auth/registerController');


// Validations
const ValidationRegister = require('./../../validations/registerValidation');
const CommentValidation = require('./../../validations/commentValidation');

// Middlewaer
const IfNotAuth = require('./../../http/middleware/ifNotAuth')

// Home Routes
router.get('/', homeController.index);


// Course
router.get('/courses', CourseController.index);
router.get('/courses/single/:id', CourseController.single);
router.get('/download/:episode', CourseController.download);


// Comment  
router.post('/comment', CommentValidation.handel(), CommentController.store);


// Course payment
router.post('/course/payment',IfNotAuth.handel , CourseController.payment);



router.use('/auth', Auth);

module.exports = router;