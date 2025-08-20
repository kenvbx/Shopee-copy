// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Seller = sequelize.define(
    'Seller',
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.BIGINT },
        name: { type: DataTypes.STRING(100), allowNull: false },
        slug: { type: DataTypes.STRING(100), unique: true },
        logo: { type: DataTypes.STRING(255) },
        cover: { type: DataTypes.STRING(255) },
        description: { type: DataTypes.TEXT },
        phone: { type: DataTypes.STRING(20) },
        email: { type: DataTypes.STRING(100), validate: { isEmail: true } },
        address: { type: DataTypes.TEXT },
        status: {
            type: DataTypes.ENUM('pending', 'active', 'suspended', 'closed'),
            defaultValue: 'pending',
        },
        is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
        tableName: 'sellers',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Seller;
