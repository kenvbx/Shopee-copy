// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Voucher extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            Voucher.hasMany(models.UserVoucher, {
                foreignKey: 'voucher_id',
                as: 'UserVouchers',
            });
        }
    }
    Voucher.init(
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
            title: DataTypes.STRING(255),
            description: DataTypes.TEXT,
            discount_type: {
                type: DataTypes.ENUM('percent', 'amount'),
                defaultValue: 'amount',
            },
            discount_value: DataTypes.DECIMAL(12, 2),
            max_discount: DataTypes.DECIMAL(12, 2),
            min_order_value: DataTypes.DECIMAL(12, 2),
            shop_id: DataTypes.BIGINT,
            product_id: DataTypes.BIGINT,
            start_date: DataTypes.DATE,
            end_date: DataTypes.DATE,
            usage_limit: DataTypes.INTEGER,
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
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Voucher',
            tableName: 'vouchers',
            timestamps: false,
        }
    );
    return Voucher;
};
