// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const sequelize = require('./src/config/db.config');
const authRoutes = require('./src/api/auth.route');
const userRoutes = require('./src/api/user.route');
const statsRoutes = require('./src/api/stats.route');
const productCategoryRoutes = require('./src/api/productCategory.route');
const publicRoutes = require('./src/api/public.route');
const brandRoutes = require('./src/api/brand.route');
const productRoutes = require('./src/api/product.route');
const sellers = require('./src/api/seller.route');
const shippingClassRoutes = require('./src/api/shippingClass.route');
const attributeRoutes = require('./src/api/attribute.route');
const variationRoutes = require('./src/api/variation.route');
const tagRoutes = require('./src/api/tag.route');
const cartRoutes = require('./src/api/cart.route');
const orderRoutes = require('./src/api/order.route.js');
const addressRoutes = require('./src/api/address.route');
const voucherRoutes = require('./src/api/voucher.route.js');
const wishlistRoutes = require('./src/api/wishlist.route.js');
const reviewRoutes = require('./src/api/review.route.js');
const notificationRoutes = require('./src/api/notification.route.js');
const optionRoutes = require('./src/api/option.route.js');
const bannerRoute = require('./src/api/banner.route.js');
const subscriberRoutes = require('./src/api/subscriber.route.js');
const testimonialRoutes = require('./src/api/testimonial.route.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Kết nối database
sequelize
    .authenticate()
    .then(() => console.log('✅ Kết nối cơ sở dữ liệu thành công.'))
    .catch((err) => console.error('❌ Không thể kết nối tới cơ sở dữ liệu:', err));

// Route "Hello World"
app.get('/', (req, res) => {
    res.send('<h1>Backend Shopee đang hoạt động!</h1>');
});

// Lắp ráp route vào ứng dụng
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/product-categories', productCategoryRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sellers', sellers);
app.use('/api/shipping-classes', shippingClassRoutes);
app.use('/api/attributes', attributeRoutes);
app.use('/api/variations', variationRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/vouchers', voucherRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/options', optionRoutes);
app.use('/api/banners', bannerRoute);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/public/testimonials', testimonialRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
