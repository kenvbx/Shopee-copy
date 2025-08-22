// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();

// Import các route của bạn
const authRoutes = require('./auth.route');
const productRoutes = require('./product.route');
const userRoutes = require('./user.route');
const statsRoutes = require('./stats.route');
const productCategoryRoutes = require('./productCategory.route');
const publicRoutes = require('./public.route');
const brandRoutes = require('./brand.route');
const sellers = require('./seller.route');
const shippingClassRoutes = require('./shippingClass.route');
const attributeRoutes = require('./attribute.route');
const variationRoutes = require('./variation.route');
const tagRoutes = require('./tag.route');
const cartRoutes = require('./cart.route');
const orderRoutes = require('./order.route.js');
const addressRoutes = require('./address.route');
const voucherRoutes = require('./voucher.route.js');
const wishlistRoutes = require('./wishlist.route.js');
const reviewRoutes = require('./review.route.js');
const notificationRoutes = require('./notification.route.js');
const optionRoutes = require('./option.route.js');
const bannerRoute = require('./banner.route.js');
const subscriberRoutes = require('./subscriber.route.js');
const testimonialRoutes = require('./testimonial.route.js');

// Gán các route vào router chính
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/stats', statsRoutes);
router.use('/product-categories', productCategoryRoutes);
router.use('/public', publicRoutes);
router.use('/brands', brandRoutes);
router.use('/sellers', sellers);
router.use('/shipping-classes', shippingClassRoutes);
router.use('/attributes', attributeRoutes);
router.use('/variations', variationRoutes);
router.use('/tags', tagRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/addresses', addressRoutes);
router.use('/vouchers', voucherRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/reviews', reviewRoutes);
router.use('/notifications', notificationRoutes);
router.use('/options', optionRoutes);
router.use('/banners', bannerRoute);
router.use('/subscribers', subscriberRoutes);
router.use('/public/testimonials', testimonialRoutes);

module.exports = router;
