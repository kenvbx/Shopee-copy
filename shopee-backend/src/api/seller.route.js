// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const controller = require('../modules/sellers/seller.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

router.use(authMiddleware, adminMiddleware);

router.route('/').get(controller.getAllSellers).post(controller.createSeller);
router.route('/:id').get(controller.getSellerById).put(controller.updateSeller).delete(controller.deleteSeller);

module.exports = router;
