// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Product = sequelize.define(
    'Product',
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(255), allowNull: false },
        slug: { type: DataTypes.STRING(255), unique: true },
        description: { type: DataTypes.TEXT },
        price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
        stock: { type: DataTypes.INTEGER, defaultValue: 0 },
        sold_individually: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        manage_stock: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        stock_status: {
            type: DataTypes.ENUM('in_stock', 'out_of_stock', 'on_backorder'),
            defaultValue: 'in_stock',
        },
        allow_backorders: {
            type: DataTypes.ENUM('no', 'notify', 'yes'),
            defaultValue: 'no',
        },
        low_stock_threshold: {
            type: DataTypes.INTEGER,
        },
        brand_id: { type: DataTypes.BIGINT },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active',
        },
        main_image: { type: DataTypes.STRING(255) },
        product_type: {
            type: DataTypes.ENUM('simple', 'grouped', 'external', 'variable'),
            defaultValue: 'simple',
        },
        external_url: {
            type: DataTypes.STRING(255),
        },
        button_text: {
            type: DataTypes.STRING(255),
        },
        seller_id: { type: DataTypes.BIGINT },
        sku: { type: DataTypes.STRING(100), unique: true },
        barcode: { type: DataTypes.STRING(100) },
        short_description: { type: DataTypes.TEXT },
        sale_price: { type: DataTypes.DECIMAL(12, 2) },
        sale_start: { type: DataTypes.DATE },
        sale_end: { type: DataTypes.DATE },
        visibility: {
            type: DataTypes.ENUM('public', 'private'),
            defaultValue: 'public',
        },
        meta_title: { type: DataTypes.STRING(255) },
        meta_description: { type: DataTypes.STRING(500) },
        weight: { type: DataTypes.DECIMAL(8, 2) },
        length: { type: DataTypes.DECIMAL(8, 2) },
        width: { type: DataTypes.DECIMAL(8, 2) },
        height: { type: DataTypes.DECIMAL(8, 2) },
        rating_avg: { type: DataTypes.DECIMAL(3, 2), defaultValue: 0.0 },
        rating_count: { type: DataTypes.INTEGER, defaultValue: 0 },
        sold_count: { type: DataTypes.INTEGER, defaultValue: 0 },
        view_count: { type: DataTypes.INTEGER, defaultValue: 0 },
        is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
        up_sell_ids: { type: DataTypes.TEXT },
        cross_sell_ids: { type: DataTypes.TEXT },
        purchase_note: {
            type: DataTypes.TEXT,
        },
        menu_order: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        enable_reviews: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        default_variation_id: {
            type: DataTypes.BIGINT,
        },
    },
    {
        tableName: 'products',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);

module.exports = Product;
