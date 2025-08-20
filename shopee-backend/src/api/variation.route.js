// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const controller = require('../modules/products/product.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const upload = require('../middleware/upload.middleware');

// Áp dụng middleware bảo vệ cho tất cả các route bên dưới
router.use(authMiddleware, adminMiddleware);

// Route để upload ảnh cho một biến thể cụ thể
router.post('/:variationId/upload-image', upload.single('image'), controller.uploadVariationImage);

// Route để upload gallery cho một biến thể
router.post('/:variationId/upload-gallery', upload.array('gallery_images', 10), controller.uploadVariationGallery);

module.exports = router;
