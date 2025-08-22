// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const controller = require('../modules/reviews/review.controller');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

router.get('/product/:productId', controller.getProductReviews);

router.use(authMiddleware); // Yêu cầu đăng nhập

router.get('/my-reviews', controller.getMyReviews);
// router.post('/', controller.createReview);

router.post(
    '/',
    upload.fields([
        { name: 'images', maxCount: 5 }, // Xử lý tối đa 5 file ảnh có tên là 'images'
        { name: 'productId' }, // Xử lý trường productId
        { name: 'rating' }, // Xử lý trường rating
        { name: 'content' }, // Xử lý trường content
    ]),
    controller.createReview
);

module.exports = router;
