// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ReviewImage extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            ReviewImage.belongsTo(models.ProductReview, {
                foreignKey: 'review_id',
                as: 'Review',
            });
        }
    }
    ReviewImage.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            review_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            image_url: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'ReviewImage',
            tableName: 'review_images',
            timestamps: false, // Bảng này không có cột timestamps
        }
    );
    return ReviewImage;
};
