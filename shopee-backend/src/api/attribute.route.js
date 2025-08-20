// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const controller = require('../modules/attributes/attribute.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// Bảo vệ tất cả các route bên dưới
router.use(authMiddleware, adminMiddleware);

// Routes cho Thuộc tính (Attribute)
router.route('/').get(controller.getAllAttributes).post(controller.createAttribute);

// Ví dụ routes cho Update/Delete thuộc tính
router.route('/:id').get(controller.getAttributeById).put(controller.updateAttribute).delete(controller.deleteAttribute);

// Routes cho Giá trị Thuộc tính (Attribute Value)
router.route('/:attribute_id/values').post(controller.createAttributeValue);

// Ví dụ routes cho Update/Delete giá trị
router.route('/values/:value_id').put(controller.updateAttributeValue).delete(controller.deleteAttributeValue);

module.exports = router;
