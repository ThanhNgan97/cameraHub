const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

// Routes
router.get('/', authMiddleware, isAdmin, userController.getAllUsers); // Admin only
router.get('/:id', authMiddleware, userController.getUserById); // Authenticated users
router.put('/:id', authMiddleware, userController.updateUser); // Authenticated users (checks in controller)
router.delete('/:id', authMiddleware, isAdmin, userController.deleteUser); // Admin only

module.exports = router;
