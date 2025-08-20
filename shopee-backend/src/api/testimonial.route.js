// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const controller = require('../modules/testimonials/testimonial.controller');

// Đây là route công khai nên không cần middleware
router.get('/', controller.getActiveTestimonials);

module.exports = router;
