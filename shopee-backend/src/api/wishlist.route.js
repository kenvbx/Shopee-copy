// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const controller = require('../modules/wishlist/wishlist.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware); // Yêu cầu đăng nhập

router.route('/').get(controller.getMyWishlist).post(controller.addToWishlist);

router.delete('/:productId', controller.removeFromWishlist);

module.exports = router;
