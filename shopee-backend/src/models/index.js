// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const sequelize = require('../config/db.config');

const db = {};

// Nạp tất cả các model vào đối tượng db
db.User = require('../modules/auth/user.model');
db.Seller = require('../modules/sellers/seller.model');
db.ProductCategory = require('../modules/categories/productCategory.model');
db.Brand = require('../modules/brands/brand.model');
db.Tag = require('../modules/tags/tag.model');
db.Attribute = require('../modules/attributes/attribute.model');
db.AttributeValue = require('../modules/attributes/attributeValue.model');
db.ShippingClass = require('../modules/shipping/shippingClass.model');
db.Product = require('../modules/products/product.model');
db.ProductImage = require('../modules/products/productImage.model');
db.Variation = require('../modules/products/variation.model');
db.VariationAttributeValue = require('../modules/products/variationAttributeValue.model');
db.VariationImage = require('../modules/products/variationImage.model');
db.Cart = require('../modules/carts/cart.model');
db.CartItem = require('../modules/carts/cartItem.model');
db.Order = require('../modules/orders/order.model');
db.OrderItem = require('../modules/orders/orderItem.model');
db.UserAddress = require('../modules/addresses/userAddress.model.js');
db.Voucher = require('../modules/vouchers/voucher.model.js');
db.UserVoucher = require('../modules/vouchers/userVoucher.model.js');
db.Wishlist = require('../modules/wishlist/wishlist.model.js');
db.Review = require('../modules/reviews/review.model.js');
db.Notification = require('../modules/notifications/notification.model.js');
db.Option = require('../modules/options/option.model');
db.Banner = require('../modules/banners/banner.model');
db.Subscriber = require('../modules/subscribers/subscriber.model');
db.Testimonial = require('../modules/testimonials/testimonial.model.js');
db.Post = require('../modules/posts/post.model.js');
db.ReviewImage = require('../modules/reviews/reviewImage.model.js');

// User <-> Seller
db.User.hasOne(db.Seller, { foreignKey: 'user_id' });
db.Seller.belongsTo(db.User, { foreignKey: 'user_id' });

// Product <-> Seller, Brand, ShippingClass
db.Product.belongsTo(db.Seller, { foreignKey: 'seller_id' });
db.Seller.hasMany(db.Product, { foreignKey: 'seller_id' });
db.Product.belongsTo(db.Brand, { foreignKey: 'brand_id' });
db.Brand.hasMany(db.Product, { foreignKey: 'brand_id' });
db.Product.belongsTo(db.ShippingClass, { foreignKey: 'shipping_class_id' });
db.ShippingClass.hasMany(db.Product, { foreignKey: 'shipping_class_id' });

// Product <-> ProductCategory (Nhiều-Nhiều)
db.Product.belongsToMany(db.ProductCategory, { through: 'product_category_map', foreignKey: 'product_id', otherKey: 'category_id', timestamps: false });
db.ProductCategory.belongsToMany(db.Product, { through: 'product_category_map', foreignKey: 'category_id', otherKey: 'product_id', timestamps: false });

// Product <-> Tag (Nhiều-Nhiều)
db.Product.belongsToMany(db.Tag, { through: 'product_tag_map', foreignKey: 'product_id', otherKey: 'tag_id', timestamps: false });
db.Tag.belongsToMany(db.Product, { through: 'product_tag_map', foreignKey: 'tag_id', otherKey: 'product_id', timestamps: false });

// Product <-> AttributeValue (Nhiều-Nhiều) - Để lưu các tùy chọn của sản phẩm
db.Product.belongsToMany(db.AttributeValue, { through: 'product_attribute_value_map', foreignKey: 'product_id', otherKey: 'value_id', as: 'AttributeValues' });
db.AttributeValue.belongsToMany(db.Product, { through: 'product_attribute_value_map', foreignKey: 'value_id', otherKey: 'product_id' });

// Attribute <-> AttributeValue (Một-Nhiều)
db.Attribute.hasMany(db.AttributeValue, { foreignKey: 'attribute_id', as: 'values' });
db.AttributeValue.belongsTo(db.Attribute, { foreignKey: 'attribute_id' });

// Product <-> ProductImage (Một-Nhiều)
db.Product.hasMany(db.ProductImage, { foreignKey: 'product_id', as: 'ProductImages' });
db.ProductImage.belongsTo(db.Product, { foreignKey: 'product_id' });

// Product <-> Variation (Một-Nhiều)
db.Product.hasMany(db.Variation, { foreignKey: 'product_id', as: 'Variations' });
db.Variation.belongsTo(db.Product, { foreignKey: 'product_id' });

// Variation <-> AttributeValue (Nhiều-Nhiều)
db.Variation.belongsToMany(db.AttributeValue, {
    through: db.VariationAttributeValue,
    foreignKey: 'variation_id',
    otherKey: 'attribute_value_id',
    as: 'AttributeValues',
});
db.AttributeValue.belongsToMany(db.Variation, {
    through: db.VariationAttributeValue,
    foreignKey: 'attribute_value_id',
    otherKey: 'variation_id',
});

// Mối quan hệ: Product -> Default Variation (Một-Một)
// Một sản phẩm có thể có một biến thể mặc định
db.Product.belongsTo(db.Variation, { foreignKey: 'default_variation_id', as: 'DefaultVariation' });

// Mối quan hệ: Variation <-> VariationImage (Một-Nhiều)
db.Variation.hasMany(db.VariationImage, { foreignKey: 'variation_id', as: 'GalleryImages' });
db.VariationImage.belongsTo(db.Variation, { foreignKey: 'variation_id' });

// Mối quan hệ: User <-> Cart (Một-Một)
db.User.hasOne(db.Cart, { foreignKey: 'user_id' });
db.Cart.belongsTo(db.User, { foreignKey: 'user_id' });

// Mối quan hệ: Cart <-> CartItem (Một-Nhiều)
db.Cart.hasMany(db.CartItem, { foreignKey: 'cart_id' });
db.CartItem.belongsTo(db.Cart, { foreignKey: 'cart_id' });

// Mối quan hệ: Product, Variation -> CartItem
db.CartItem.belongsTo(db.Product, { foreignKey: 'product_id' });
db.CartItem.belongsTo(db.Variation, { foreignKey: 'variation_id' });

// User <-> Order (Một-Nhiều)
db.User.hasMany(db.Order, { foreignKey: 'user_id' });
db.Order.belongsTo(db.User, { foreignKey: 'user_id' });

// Order <-> OrderItem (Một-Nhiều)
db.Order.hasMany(db.OrderItem, { foreignKey: 'order_id' });
db.OrderItem.belongsTo(db.Order, { foreignKey: 'order_id' });

// OrderItem -> Product & Variation
db.OrderItem.belongsTo(db.Product, { foreignKey: 'product_id' });
db.OrderItem.belongsTo(db.Variation, { foreignKey: 'variation_id' });

db.User.hasMany(db.UserAddress, { foreignKey: 'user_id' });
db.UserAddress.belongsTo(db.User, { foreignKey: 'user_id' });

// Mối quan hệ: User <-> UserVoucher
db.User.hasMany(db.UserVoucher, { foreignKey: 'user_id' });
db.UserVoucher.belongsTo(db.User, { foreignKey: 'user_id' });

// Mối quan hệ: Voucher <-> UserVoucher
db.Voucher.hasMany(db.UserVoucher, { foreignKey: 'voucher_id' });
db.UserVoucher.belongsTo(db.Voucher, { foreignKey: 'voucher_id' });

// Mối quan hệ: User <-> Wishlist
db.User.hasMany(db.Wishlist, { foreignKey: 'user_id' });
db.Wishlist.belongsTo(db.User, { foreignKey: 'user_id' });

// Mối quan hệ: Product <-> Wishlist
db.Product.hasMany(db.Wishlist, { foreignKey: 'product_id' });
db.Wishlist.belongsTo(db.Product, { foreignKey: 'product_id' });

// User <-> Review (Một-Nhiều)
db.User.hasMany(db.Review, { foreignKey: 'user_id' });
db.Review.belongsTo(db.User, { foreignKey: 'user_id' });

// Product <-> Review (Một-Nhiều)
db.Product.hasMany(db.Review, { foreignKey: 'product_id' });
db.Review.belongsTo(db.Product, { foreignKey: 'product_id' });

// Order <-> Review (Tùy chọn, Một-Một)
db.Order.hasOne(db.Review, { foreignKey: 'order_id' });
db.Review.belongsTo(db.Order, { foreignKey: 'order_id' });

// User <-> Notification (Một-Nhiều)
db.User.hasMany(db.Notification, { foreignKey: 'user_id' });
db.Notification.belongsTo(db.User, { foreignKey: 'user_id' });

// User <-> Post (Một-Nhiều)
db.User.hasMany(db.Post, { foreignKey: 'user_id' });
db.Post.belongsTo(db.User, { foreignKey: 'user_id' });

// User <-> Review (Một người dùng có nhiều đánh giá)
db.User.hasMany(db.Review, { foreignKey: 'user_id' });
db.Review.belongsTo(db.User, { foreignKey: 'user_id' });

// Product <-> Review (Một sản phẩm có nhiều đánh giá)
db.Product.hasMany(db.Review, { foreignKey: 'product_id' });
db.Review.belongsTo(db.Product, { foreignKey: 'product_id' });

// Order <-> Review (Một đơn hàng có thể có một đánh giá)
db.Order.hasOne(db.Review, { foreignKey: 'order_id' });
db.Review.belongsTo(db.Order, { foreignKey: 'order_id' });

db.Review.hasMany(db.ReviewImage, { foreignKey: 'review_id', as: 'images' });
db.ReviewImage.belongsTo(db.Review, { foreignKey: 'review_id' });

db.sequelize = sequelize;

module.exports = db;
