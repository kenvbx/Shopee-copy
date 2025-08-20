// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const ShippingClass = sequelize.define(
    'ShippingClass',
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
        slug: { type: DataTypes.STRING(100), unique: true },
        description: { type: DataTypes.TEXT },
    },
    {
        tableName: 'shipping_classes',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = ShippingClass;
