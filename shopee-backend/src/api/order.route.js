// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const controller = require('../modules/orders/order.controller');
const softAuthMiddleware = require('../middleware/softAuth.middleware');

router.post('/checkout', softAuthMiddleware, controller.createOrder);
router.get('/my-orders', controller.getMyOrders);
router.get('/my-orders/:orderId', controller.getMyOrderDetails);

module.exports = router;
