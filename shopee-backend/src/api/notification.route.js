// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const controller = require('../modules/notifications/notification.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware); // Yêu cầu đăng nhập

router.get('/my-notifications', controller.getMyNotifications);
router.put('/:notificationId/read', controller.markAsRead);

module.exports = router;
