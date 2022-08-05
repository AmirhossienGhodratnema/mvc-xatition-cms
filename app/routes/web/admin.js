const express = require('express');
const router = express.Router();


// Layout view admin panel
router.use((req, res, next) => {
    res.locals.layout = "admin/master";
    next();
});


// Controllers
const AdminController = require('app/http/controllers/admin/adminController');
const BuyController = require('../../http/controllers/admin/buyController');
const UserController = require('../../http/controllers/admin/userController');
const AccesslevelController = require('../../http/controllers/admin/accesslevelController');
const CourseController = require('../../http/controllers/admin/courseController');
const EpisodeController = require('../../http/controllers/admin/episodeController');
const CommentController = require('../../http/controllers/admin/commentController');
const CategoryController = require('../../http/controllers/admin/categoryController');
const RoleController = require('../../http/controllers/admin/roleController');
const AssessmentController = require('../../http/controllers/admin/assessmentController');


// Validations
const BuyValidation = require('./../../validations/buyValidation');
const RegisterValidation = require('./../../validations/registerValidation');
const AccesslevelValidation = require('./../../validations/AccesslevelValidation');
const CourseValidation = require('./../../validations/courseValidation');
const EpisodeValidation = require('./../../validations/episodeValidation');
const CategoryValidation = require('./../../validations/categoryValidation');
const RoleValidation = require('./../../validations/roleValidation');
const AssessmentValidation = require('./../../validations/assessmentValidation');


// Middlewear
const ConvertFileToField = require('./../../http/middleware/convertFileToField')
const gate = require('./../../gate');

// Upload image
const upload = require('./../../uploadImage');


// Admin Routes
router.get('/', AdminController.index);


// Course
router.get('/courses', gate.can('class-creation'), CourseController.index);
router.get('/courses/create', CourseController.create);
router.get('/courses/edit/:id', CourseController.edit);
router.post('/courses/create', upload.single('images'), ConvertFileToField.handel, CourseValidation.handel(), CourseController.store);
router.put('/courses/update/:id', upload.single('images'), CourseController.update);
router.delete('/courses/distroy/:id', CourseController.distroy);

// Episode
router.get('/episodes', gate.can('class-registration'), EpisodeController.index);
router.get('/episodes/create', EpisodeController.create);
router.get('/episodes/edit/:id', EpisodeController.edit);
router.post('/episodes/create', EpisodeValidation.handel(), EpisodeController.store);
router.put('/episodes/update/:id', EpisodeValidation.handel(), EpisodeController.update);
router.delete('/episodes/distroy/:id', EpisodeController.distroy);
router.get('/episodes/:id', EpisodeController.specificParts);


// Comment
router.get('/comments', gate.can('comments'), CommentController.index);
router.get('/comments/approved/:id', CommentController.approved);
router.get('/comments/approved-comments', CommentController.approvedComments);
router.delete('/comments/distroy/:id', CommentController.distroy);


// Category
router.get('/category',gate.can('categories'), CategoryController.index);
router.get('/category/create', CategoryController.create);
router.get('/category/edit/:id', CategoryController.edit);
router.post('/category/create', CategoryValidation.handel(), CategoryController.store);
router.put('/category/update/:id', CategoryValidation.handel(), CategoryController.update);
router.delete('/category/distroy/:id', CategoryController.distroy);


// Buy
router.get('/buy', BuyController.index);
router.get('/buy/create', BuyController.create);
router.get('/buy/edit/:id', BuyController.edit);
router.post('/buy/create', BuyValidation.handel(), BuyController.store);
router.post('/buy/update/:id', BuyValidation.handel(), BuyController.update);
router.delete('/buy/distroy/:id', BuyController.distroy);


// Show user
router.get('/user', gate.can('users'), UserController.index);
router.get('/user/create', UserController.create);
router.post('/user/create', RegisterValidation.handel(), UserController.store);
router.post('/user/adminChange/:id', UserController.changeAdmin);
router.get('/user/adminUser', UserController.adminUser);
router.delete('/user/distroy/:id', UserController.distroy);
router.get('/user/role/:id', UserController.addRoleForUser);
router.post('/user/role/:id', UserController.storeRoleForUser);


// Access level
router.get('/premission', gate.can('add-access-level'), AccesslevelController.index);
router.get('/premission/create', AccesslevelController.create);
router.get('/premission/edit/:id', AccesslevelController.edit);
router.post('/premission/create', AccesslevelValidation.handel(), AccesslevelController.store);
router.put('/premission/update/:id', AccesslevelValidation.handel(), AccesslevelController.update);
router.delete('/premission/distroy/:id', AccesslevelController.distroy);

// Role
router.get('/roles', RoleController.index);
router.get('/roles/create', RoleController.create);
router.get('/roles/edit/:id', RoleController.edit);
router.post('/roles/create', RoleValidation.handel(), RoleController.store);
router.put('/roles/update/:id', RoleValidation.handel(), RoleController.update);
router.delete('/roles/distroy/:id', RoleController.distroy);


// Assessment
router.get('/assessment',gate.can('assessment'), AssessmentController.index);
router.get('/assessment/create/:id', AssessmentController.create);
router.get('/assessment/indexSingle/:id', AssessmentController.indexSingle);
router.get('/assessment/edit/:id', AssessmentController.edit);
router.post('/assessment/create', AssessmentValidation.handel(), AssessmentController.store);
router.put('/assessment/update/:id', AssessmentValidation.handel(), AssessmentController.update);
router.delete('/assessment/distroy/:id', AssessmentController.distroy);


router.post('/upload-image', upload.single('upload'), AdminController.uploadImage);

module.exports = router;