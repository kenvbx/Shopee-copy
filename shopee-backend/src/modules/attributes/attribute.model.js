// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Attribute = sequelize.define(
    'Attribute',
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
        slug: { type: DataTypes.STRING(100), unique: true },
        enable_archives: { type: DataTypes.BOOLEAN, defaultValue: true },
        default_sort_order: {
            type: DataTypes.ENUM('custom', 'name', 'name_numeric', 'id'),
            defaultValue: 'custom',
        },
        swatch_size: {
            type: DataTypes.ENUM('default', 'large', 'extra_large'),
            defaultValue: 'default',
        },
        show_label: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
        tableName: 'product_attributes',
        timestamps: false,
    }
);

module.exports = Attribute;
