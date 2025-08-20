// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const CartItem = sequelize.define(
    'CartItem',
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        cart_id: { type: DataTypes.BIGINT, allowNull: false },
        product_id: { type: DataTypes.BIGINT, allowNull: false },
        variation_id: { type: DataTypes.BIGINT },
        quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    },
    {
        tableName: 'cart_items',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = CartItem;
