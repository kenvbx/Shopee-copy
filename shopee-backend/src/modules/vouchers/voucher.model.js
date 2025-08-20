// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Voucher = sequelize.define(
    'Voucher',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING(50),
            unique: true,
        },
        type: {
            type: DataTypes.ENUM('global', 'shop', 'user', 'product'),
            defaultValue: 'global',
        },
        title: {
            type: DataTypes.STRING(255),
        },
        description: {
            type: DataTypes.TEXT,
        },
        discount_type: {
            type: DataTypes.ENUM('percent', 'amount'),
            defaultValue: 'amount',
        },
        discount_value: {
            type: DataTypes.DECIMAL(12, 2),
        },
        max_discount: {
            type: DataTypes.DECIMAL(12, 2),
        },
        min_order_value: {
            type: DataTypes.DECIMAL(12, 2),
        },
        shop_id: {
            type: DataTypes.BIGINT,
        },
        product_id: {
            type: DataTypes.BIGINT,
        },
        start_date: {
            type: DataTypes.DATE,
        },
        end_date: {
            type: DataTypes.DATE,
        },
        usage_limit: {
            type: DataTypes.INTEGER,
        },
        per_user_limit: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        used_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active',
        },
    },
    {
        tableName: 'vouchers',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false, // Bảng của bạn không có cột updated_at
    }
);

module.exports = Voucher;
