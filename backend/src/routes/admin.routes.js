const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

// All routes here require admin privileges
router.use(authMiddleware, isAdmin);

// Statistics
router.get('/stats', adminController.getDashboardStats);

// Admin Management
router.get('/admins', adminController.getAllAdmins);
router.post('/admins', adminController.createAdmin);

// Shop Approvals
router.get('/shops/pending', adminController.getPendingShops);
router.post('/shops/:id/approve', adminController.approveShop);

// Product Approvals
router.get('/products/pending', adminController.getPendingProducts);
router.post('/products/:id/approve', adminController.approveProduct);

// Reports
router.get('/reports', adminController.getAllReports);
router.post('/reports/:id/resolve', adminController.resolveReport);

module.exports = router;
