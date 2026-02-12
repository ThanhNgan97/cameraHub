const express = require('express');
const router = express.Router();

const {
    register,
    login,
    getMe,
    googleLogin,
    forgotPassword,
    resetPassword,
    changePassword,
    githubLogin,
    githubCallback,
    updateProfile,
    uploadAvatar
} = require('../controllers/auth.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password', authMiddleware, changePassword);

// Google
router.post('/google-login', googleLogin);

// GitHub
router.get('/github', githubLogin);
router.get('/github/callback', githubCallback);

// Me
router.get('/me', authMiddleware, getMe);
router.put('/me', authMiddleware, updateProfile);
router.post('/me/avatar', authMiddleware, require('../middlewares/upload.middleware').single('avatar'), uploadAvatar);

module.exports = router;
