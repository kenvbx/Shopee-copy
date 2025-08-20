// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const UserAddress = sequelize.define(
    'UserAddress',
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.BIGINT, allowNull: false },
        recipient_name: { type: DataTypes.STRING(100) },
        phone: { type: DataTypes.STRING(20) },
        address: { type: DataTypes.STRING(255) },
        city: { type: DataTypes.STRING(100) },
        district: { type: DataTypes.STRING(100) },
        ward: { type: DataTypes.STRING(100) },
        is_default: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
        tableName: 'user_addresses',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false, // Bảng của bạn không có updatedAt
    }
);

module.exports = UserAddress;
