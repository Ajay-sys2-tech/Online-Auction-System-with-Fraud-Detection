const express = require("express");
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/signup', authController.signup );
router.post('/login', authController.login );
router.post('/seller', authController.seller );
// router.post('/buyer', authController.buyer );
router.get('/buyer', authController.buyer );
router.get('/tables', authController.tables );
router.post('/addtocart', authController.addtocart );
router.get('/bids', authController.bids );

module.exports = router;