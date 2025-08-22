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

// ==========================================================
// == 1. CÁC ROUTE CÔNG KHAI (PUBLIC ROUTES)                ==
// == -> Đặt tất cả các route không cần đăng nhập ở đây      ==
// ==========================================================

// Lấy danh sách sản phẩm (có filter, sort, paginate)
router.get('/', controller.getAllProducts);

// Lấy sản phẩm theo IDs (cho chức năng Vừa xem)
router.post('/by-ids', controller.getProductsByIds);

// Lấy sản phẩm theo ID (tránh xung đột với slug)
router.get('/id/:id', controller.getProductById);

// Lấy sản phẩm theo SLUG (PHẢI ĐẶT SAU CÙNG trong nhóm public)
router.get('/:slug', controller.getProductBySlug);

// ==========================================================
// == 2. CÁC ROUTE CẦN BẢO VỆ (PROTECTED ROUTES)            ==
// == -> Các route cho admin, cần đăng nhập và có quyền     ==
// ==========================================================

router.post('/', authMiddleware, adminMiddleware, controller.createProduct);

router.put('/:id', authMiddleware, adminMiddleware, controller.updateProduct);

router.delete('/:id', authMiddleware, adminMiddleware, controller.deleteProduct);

// ==========================================================
// == 3. EXPORT ROUTER                                     ==
// ==========================================================

module.exports = router;
