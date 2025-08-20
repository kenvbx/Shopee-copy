// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const OrderItem = sequelize.define(
    'OrderItem',
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        order_id: { type: DataTypes.BIGINT, allowNull: false },
        product_id: { type: DataTypes.BIGINT },
        variation_id: { type: DataTypes.BIGINT },
        product_name: { type: DataTypes.STRING(255) },
        quantity: { type: DataTypes.INTEGER },
        price: { type: DataTypes.DECIMAL(12, 2) },
        seller_id: { type: DataTypes.BIGINT },
    },
    {
        tableName: 'order_items',
        timestamps: false, // Bảng này không có timestamps theo CSDL của bạn
    }
);

module.exports = OrderItem;
