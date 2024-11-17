const express = require('express');
const viewController = require('../controllers/viewController');
const { verifyToken } = require('../utils/jwt');
const router = express.Router();

router.get('/', viewController.getHomePage);
router.get('/game', viewController.getGamePage);
router.get('/cart', viewController.getCarrito);
router.get('/profile', viewController.getProfile);

module.exports = router;
