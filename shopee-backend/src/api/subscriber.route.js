// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const controller = require('../modules/subscribers/subscriber.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// Bảo vệ tất cả các route bên dưới
router.use(authMiddleware, adminMiddleware);

router.get('/', controller.getAllSubscribers);
router.put('/:id', controller.updateSubscriber);
router.delete('/:id', controller.deleteSubscriber);

module.exports = router;
