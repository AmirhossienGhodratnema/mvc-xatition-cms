const express = require('express');
const router = express.Router();


// Controllers
const UserPanelController = require('../../http/controllers/userPanel/userpanelController');


// Validation
const BuyPersonelValidation = require('./../../validations/buyPersonelValidation')


// Middlewaer
const IfNotAuth = require('./../../http/middleware/ifNotAuth')



router.get('/', UserPanelController.index);






router.get('/class-analyze/:id', UserPanelController.class);
// router.post('/addBuy', BuyPersonelValidation.handel(), UserPanelController.addUserBuy);
// router.get('/shopingList', UserPanelController.shopingList);
// router.get('/works', UserPanelController.works);

// router.delete('/buy/store/:id', UserPanelController.distroy);

// router.get('/vip', UserPanelController.vip);

// Payments
router.get('/payment/:id',IfNotAuth.handel , UserPanelController.showPay);




module.exports = router;