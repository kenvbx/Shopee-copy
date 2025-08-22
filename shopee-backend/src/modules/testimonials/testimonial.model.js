// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
// shopee-backend/src/modules/testimonials/testimonial.model.js

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Testimonial extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ nếu có
        }
    }
    Testimonial.init(
        {
            id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
            author_name: { type: DataTypes.STRING(100), allowNull: false },
            author_position: { type: DataTypes.STRING(100) },
            content: { type: DataTypes.TEXT, allowNull: false },
            rating: { type: DataTypes.INTEGER, defaultValue: 5 },
            avatar_url: { type: DataTypes.STRING(255) },
            status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
        },
        {
            sequelize,
            modelName: 'Testimonial',
            tableName: 'testimonials', // Giả sử tên bảng là 'testimonials'
            timestamps: true, // Thêm timestamps
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return Testimonial;
};
