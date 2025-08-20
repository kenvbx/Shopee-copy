// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const { getSummaryStats } = require('../modules/stats/stats.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// Route này được bảo vệ, chỉ admin mới có thể truy cập
router.get('/summary', authMiddleware, adminMiddleware, getSummaryStats);

module.exports = router;