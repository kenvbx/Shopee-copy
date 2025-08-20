// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const ReviewImage = sequelize.define(
    'ReviewImage',
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        review_id: { type: DataTypes.BIGINT, allowNull: false },
        image_url: { type: DataTypes.STRING, allowNull: false },
    },
    {
        tableName: 'review_images',
        timestamps: false,
    }
);

module.exports = ReviewImage;
