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

router.use(authMiddleware, adminMiddleware);

router.route('/').get(controller.getAllProducts).post(controller.createProduct);

router.route('/:id').get(controller.getProductById).put(controller.updateProduct).delete(controller.deleteProduct);

router.route('/:id/upload-image').post(upload.single('main_image'), controller.uploadProductImage);

router.route('/:id/upload-album').post(upload.array('album_images', 10), controller.uploadProductAlbum);

router.route('/:id/attributes').put(controller.updateProductAttributes);

router.delete('/album-image/:imageId', authMiddleware, adminMiddleware, controller.deleteProductImage);

module.exports = router;
