// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require("express");
const router = express.Router();
const controller = require("../modules/brands/brand.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const upload = require("../middleware/upload.middleware");

router.use(authMiddleware, adminMiddleware);

router.route("/").get(controller.getAllBrands).post(controller.createBrand);

router.route("/:id").put(controller.updateBrand).delete(controller.deleteBrand);

router
  .route("/:id/upload-logo")
  .post(upload.single("logo"), controller.uploadBrandLogo);

module.exports = router;
