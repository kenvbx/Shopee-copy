// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Order = sequelize.define(
    'Order',
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.BIGINT },
        seller_id: { type: DataTypes.BIGINT },
        total: { type: DataTypes.DECIMAL(12, 2) },
        status: { type: DataTypes.ENUM('pending', 'paid', 'shipped', 'completed', 'cancelled', 'returned'), defaultValue: 'pending' },
        payment_status: { type: DataTypes.ENUM('unpaid', 'paid', 'refunded'), defaultValue: 'unpaid' },
        receiver_name: { type: DataTypes.STRING(100) },
        receiver_phone: { type: DataTypes.STRING(20) },
        receiver_address: { type: DataTypes.TEXT },
        note: { type: DataTypes.TEXT },
    },
    {
        tableName: 'orders',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Order;
