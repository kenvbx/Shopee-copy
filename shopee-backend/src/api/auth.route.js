// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const controller = require('../modules/auth/auth.controller');
const userController = require('../modules/users/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const { registerUser, loginUser, forgotPassword, resetPassword } = require('../modules/auth/auth.controller');

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.post('/login', controller.loginUser);
router.post('/admin/login', controller.loginAdmin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/me', authMiddleware, controller.getMyProfile);
router.put('/me', authMiddleware, controller.updateMyProfile);

router.post('/me/avatar', authMiddleware, upload.single('avatar'), userController.uploadMyAvatar);

// ... các route khác (register, forgot-password, ...)
module.exports = router;
