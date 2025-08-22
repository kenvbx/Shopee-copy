// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    // Lưu ý: Tên bảng trong DB là 'product_reviews'.
    // Tên model Sequelize có thể là 'ProductReview' hoặc 'Review' tùy bạn chọn.
    // Tôi sẽ dùng 'ProductReview' cho nhất quán.
    class ProductReview extends Model {
        static associate(models) {
            ProductReview.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'User',
            });
            ProductReview.belongsTo(models.Product, {
                foreignKey: 'product_id',
                as: 'Product',
            });
            ProductReview.hasMany(models.ReviewImage, {
                foreignKey: 'review_id',
                as: 'ReviewImages',
            });
        }
    }
    ProductReview.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            product_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            order_id: DataTypes.BIGINT,
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            title: DataTypes.STRING(255),
            content: DataTypes.TEXT,
            images: DataTypes.TEXT, // Có thể lưu dưới dạng JSON string
            video_url: DataTypes.STRING(255),
            is_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            is_approved: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'ProductReview',
            tableName: 'product_reviews',
            timestamps: false,
        }
    );
    return ProductReview;
};
