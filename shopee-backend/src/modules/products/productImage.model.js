// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const ProductImage = sequelize.define(
    'ProductImage',
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        product_id: { type: DataTypes.BIGINT, allowNull: false },
        type: { type: DataTypes.ENUM('image', 'video'), defaultValue: 'image' },
        url: { type: DataTypes.STRING(255), allowNull: false },
        position: { type: DataTypes.INTEGER, defaultValue: 0 },
        caption: { type: DataTypes.STRING(255) },
        file_size: { type: DataTypes.INTEGER },
        width_px: { type: DataTypes.INTEGER },
        height_px: { type: DataTypes.INTEGER },
        video_thumb: { type: DataTypes.STRING(255) },
        moderation_status: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected'),
            defaultValue: 'approved',
        },
        moderation_note: { type: DataTypes.STRING(255) },
        moderated_by: { type: DataTypes.BIGINT },
        moderated_at: { type: DataTypes.DATE },
    },
    {
        tableName: 'product_images',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = ProductImage;
