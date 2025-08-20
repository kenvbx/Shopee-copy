// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const controller = require('../modules/banners/banner.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const upload = require('../middleware/upload.middleware');

// Bảo vệ tất cả các route bên dưới
router.use(authMiddleware, adminMiddleware);

// Định nghĩa các route cho CRUD
router.route('/').get(controller.getAllBanners).post(upload.single('image'), controller.createBanner); // Dùng multer để xử lý upload file ảnh

router.route('/:id').get(controller.getBannerById).put(upload.single('image'), controller.updateBanner).delete(controller.deleteBanner);

module.exports = router;
