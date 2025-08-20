// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Testimonial = sequelize.define(
    'Testimonial',
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
        tableName: 'testimonials',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Testimonial;
