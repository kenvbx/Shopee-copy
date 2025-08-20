// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const router = express.Router();
const controller = require('../modules/public/public.controller');
const reviewController = require('../modules/reviews/review.controller');

router.get('/categories', controller.getPublicCategories);
router.get('/products', controller.getPublicProducts);
router.get('/product/:slug', controller.getPublicProductBySlug);
router.get('/products/featured', controller.getFeaturedProducts);
router.get('/products/on-sale', controller.getOnSaleProducts);
router.get('/search', controller.searchPublicProducts);
router.get('/search/suggestions', controller.getSearchSuggestions);
router.get('/categories/featured', controller.getFeaturedCategories);
router.get('/banners/:position', controller.getBannersByPosition);
router.post('/subscribe-newsletter', controller.subscribeToNewsletter);
router.get('/categories/hierarchy', controller.getCategoryHierarchy);
router.get('/products/newest', controller.getNewestProducts);
router.get('/products/top-selling', controller.getTopSellingProducts);
router.get('/products/top-rated', controller.getTopRatedProducts);
router.get('/products/top-discounted', controller.getTopDiscountedProducts);
router.get('/brands/featured', controller.getFeaturedBrands);
router.get('/posts/recent', controller.getRecentPosts);
router.get('/products/navigation/:id', controller.getProductNavigation);
router.get('/reviews/:productId', reviewController.getProductReviews);
router.get('/products/:productId/related', controller.getRelatedProducts);

module.exports = router;
