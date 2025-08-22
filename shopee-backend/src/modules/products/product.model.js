// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
// shopee-backend/src/modules/products/product.model.js

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            Product.belongsTo(models.Brand, {
                foreignKey: 'brand_id',
                as: 'Brand',
            });
            Product.hasMany(models.ProductImage, {
                foreignKey: 'product_id',
                as: 'ProductImages',
            });
            Product.hasMany(models.Variation, {
                foreignKey: 'product_id',
                as: 'Variations',
            });
            Product.belongsTo(models.Variation, {
                foreignKey: 'default_variation_id',
                as: 'DefaultVariation',
            });
            Product.hasMany(models.ProductReview, {
                foreignKey: 'product_id',
                as: 'ProductReviews',
            });

            Product.belongsToMany(models.ProductCategory, {
                through: {
                    model: 'product_category_map',
                    timestamps: false,
                },
                foreignKey: 'product_id',
                otherKey: 'category_id',
                as: 'ProductCategories',
            });

            Product.belongsToMany(models.Tag, {
                through: {
                    model: 'product_tag_map',
                    timestamps: false,
                },
                foreignKey: 'product_id',
                otherKey: 'tag_id',
                as: 'Tags',
            });

            Product.belongsToMany(models.AttributeValue, {
                through: {
                    model: 'product_attribute_value_map',
                    timestamps: false,
                },
                foreignKey: 'product_id',
                otherKey: 'value_id',
                as: 'AttributeValues',
            });
        }
    }
    Product.init(
        {
            id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
            seller_id: { type: DataTypes.BIGINT },
            name: { type: DataTypes.STRING(255), allowNull: false },
            slug: { type: DataTypes.STRING(255), unique: true },
            sku: { type: DataTypes.STRING(100), unique: true },
            description: { type: DataTypes.TEXT },
            short_description: { type: DataTypes.TEXT },
            price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
            sale_price: { type: DataTypes.DECIMAL(12, 2) },
            stock: { type: DataTypes.INTEGER, defaultValue: 0 },
            brand_id: { type: DataTypes.BIGINT },
            status: {
                type: DataTypes.ENUM('active', 'inactive'),
                defaultValue: 'active',
            },
            main_image: { type: DataTypes.STRING(255) },
            rating_avg: { type: DataTypes.DECIMAL(3, 2), defaultValue: 0.0 },
            rating_count: { type: DataTypes.INTEGER, defaultValue: 0 },
            sold_count: { type: DataTypes.INTEGER, defaultValue: 0 },
            product_type: {
                type: DataTypes.ENUM('simple', 'grouped', 'external', 'variable'),
                defaultValue: 'simple',
            },
            default_variation_id: {
                type: DataTypes.BIGINT,
            },
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

            external_url: {
                type: DataTypes.STRING(255),
            },
            button_text: {
                type: DataTypes.STRING(255),
            },
            barcode: { type: DataTypes.STRING(100) },
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
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Product',
            tableName: 'products',
            timestamps: false,
        }
    );
    return Product;
};
