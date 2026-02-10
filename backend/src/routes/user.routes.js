const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

// Routes
router.get('/', authMiddleware, isAdmin, userController.getAllUsers); 
// Product search (public) - MUST come before /:id
router.get('/products/search', userController.searchProducts);

router.get('/:id', authMiddleware, userController.getUserById); 
router.delete('/:id', authMiddleware, isAdmin, userController.deleteUser); 

module.exports = router;
