const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Public routes
router.get('/', shopController.getAllShops);
router.get('/:id', shopController.getShopById);

// Protected routes
router.post('/', authMiddleware, shopController.createShop);
router.put('/:id', authMiddleware, shopController.updateShop); // Controller handles ownership/admin check
router.delete('/:id', authMiddleware, shopController.deleteShop); // Controller handles ownership/admin check

module.exports = router;
