// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Brand = sequelize.define(
    'Brand',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        slug: {
            type: DataTypes.STRING(255),
            unique: true,
        },
        parent_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
        },
        logo_url: {
            type: DataTypes.STRING(255),
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active',
        },
    },
    {
        tableName: 'product_brand',
        timestamps: true,
        paranoid: true,
        createdAt: 'createdAt',
        updatedAt: 'updateAt',
        deletedAt: 'deletedAt',
    }
);

module.exports = Brand;
