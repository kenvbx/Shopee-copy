// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const VariationImage = sequelize.define(
    'VariationImage',
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        variation_id: { type: DataTypes.BIGINT, allowNull: false },
        url: { type: DataTypes.STRING(255), allowNull: false },
        position: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
        tableName: 'variation_images',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = VariationImage;
