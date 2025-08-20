// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const AttributeValue = sequelize.define(
    'AttributeValue',
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        attribute_id: { type: DataTypes.BIGINT, allowNull: false },
        value: { type: DataTypes.STRING(100), allowNull: false },
        slug: { type: DataTypes.STRING(100) },
        description: { type: DataTypes.TEXT },
    },
    {
        tableName: 'product_attribute_values',
        timestamps: false,
    }
);

module.exports = AttributeValue;
