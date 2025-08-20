// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const controller = require('../modules/tags/tag.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

router.use(authMiddleware, adminMiddleware);

router.route('/').get(controller.getAllTags).post(controller.createTag);
router.route('/:id').put(controller.updateTag).delete(controller.deleteTag);

module.exports = router;
