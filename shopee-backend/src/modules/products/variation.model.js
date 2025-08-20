// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Variation = sequelize.define(
    'Variation',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        attribute_title: {
            type: DataTypes.STRING(255),
        },
        attribute_description: {
            type: DataTypes.STRING(255),
        },
        sku: {
            type: DataTypes.STRING(100),
            unique: true,
        },
        price: {
            type: DataTypes.DECIMAL(12, 2),
        },
        sale_price: {
            type: DataTypes.DECIMAL(12, 2),
        },
        stock: {
            type: DataTypes.INTEGER,
        },
        image_url: {
            type: DataTypes.STRING(255),
        },
        attribute_description: { type: DataTypes.STRING(255) },
        barcode: { type: DataTypes.STRING(100) },
        description: { type: DataTypes.TEXT },
        sale_start: { type: DataTypes.DATE },
        sale_end: { type: DataTypes.DATE },
        manage_stock: { type: DataTypes.BOOLEAN, defaultValue: true },
        stock_status: {
            type: DataTypes.ENUM('in_stock', 'out_of_stock', 'on_backorder'),
            defaultValue: 'in_stock',
        },
        allow_backorders: {
            type: DataTypes.ENUM('no', 'notify', 'yes'),
            defaultValue: 'no',
        },
        low_stock_threshold: { type: DataTypes.INTEGER },
        weight: { type: DataTypes.DECIMAL(8, 2) },
        length: { type: DataTypes.DECIMAL(8, 2) },
        width: { type: DataTypes.DECIMAL(8, 2) },
        height: { type: DataTypes.DECIMAL(8, 2) },
        shipping_class_id: { type: DataTypes.BIGINT },
    },
    {
        tableName: 'product_variations',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Variation;
