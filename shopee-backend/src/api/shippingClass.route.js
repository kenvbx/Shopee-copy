// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const controller = require('../modules/shipping/shippingClass.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// Tất cả các route trong file này đều yêu cầu đăng nhập với quyền admin
router.use(authMiddleware, adminMiddleware);

// Định nghĩa các route cho CRUD
router.route('/').get(controller.getAllShippingClasses).post(controller.createShippingClass);

router.route('/:id').put(controller.updateShippingClass).delete(controller.deleteShippingClass);

module.exports = router;
