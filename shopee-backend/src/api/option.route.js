// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const controller = require('../modules/options/option.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const upload = require('../middleware/upload.middleware');

// Route công khai để web frontend có thể lấy
router.get('/', controller.getOptions);

// Route yêu cầu quyền admin để cập nhật
router.put('/', authMiddleware, adminMiddleware, controller.updateOptions);
router.post('/upload-image', authMiddleware, adminMiddleware, upload.single('option_image'), controller.uploadOptionImage);

module.exports = router;
