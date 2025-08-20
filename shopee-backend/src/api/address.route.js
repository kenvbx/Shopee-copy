// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const controller = require('../modules/addresses/address.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware); // Tất cả các route này đều yêu cầu đăng nhập

router.route('/').get(controller.getMyAddresses).post(controller.addAddress);

router.route('/:addressId').put(controller.updateAddress).delete(controller.deleteAddress);

module.exports = router;
