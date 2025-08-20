// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const controller = require('../modules/categories/productCategory.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const upload = require('../middleware/upload.middleware');

router.use(authMiddleware, adminMiddleware);

router.route('/').get(controller.getAllCategories).post(controller.createCategory);

router.route('/:id').put(controller.updateCategory).delete(controller.deleteCategory);

router.route('/:id/upload-image').post(upload.single('image'), controller.uploadCategoryImage);
module.exports = router;
