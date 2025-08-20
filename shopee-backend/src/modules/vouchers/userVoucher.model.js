// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const UserVoucher = sequelize.define(
    'UserVoucher',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        voucher_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('unused', 'used', 'expired'),
            defaultValue: 'unused',
        },
        used_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'user_vouchers',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false, // Bảng của bạn không có cột updated_at
    }
);

module.exports = UserVoucher;
