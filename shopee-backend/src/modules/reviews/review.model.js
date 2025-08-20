// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Review = sequelize.define(
    'Review',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                // Thêm định nghĩa tham chiếu
                model: 'products',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                // Thêm định nghĩa tham chiếu
                model: 'users',
                key: 'id',
            },
        },
        order_id: {
            type: DataTypes.BIGINT,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
        },
        content: {
            type: DataTypes.TEXT,
        },
        is_approved: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: 'product_reviews',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Review;
