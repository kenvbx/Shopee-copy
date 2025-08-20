// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const controller = require('../modules/carts/cart.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Các route này yêu cầu người dùng phải đăng nhập
router.use(authMiddleware);

router.get('/', controller.getCart);
router.post('/add', controller.addToCart);
router.post('/sync', controller.syncCart);
router.put('/item/:cartItemId', controller.updateCartItem);
router.delete('/item/:cartItemId', controller.removeFromCart);

module.exports = router;
