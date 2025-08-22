// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
// shopee-backend/src/modules/attributes/attribute.model.js

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Attribute extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            Attribute.hasMany(models.AttributeValue, {
                foreignKey: 'attribute_id',
                as: 'AttributeValues',
            });
            Attribute.belongsToMany(models.Product, {
                through: 'product_attribute_map', // Tên bảng trung gian
                foreignKey: 'attribute_id',
                otherKey: 'product_id',
                as: 'Products',
            });
        }
    }
    Attribute.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: 'name',
                unique: true,
            },
            slug: { type: DataTypes.STRING(100), unique: true },
            type: {
                type: DataTypes.ENUM('select', 'text'),
                defaultValue: 'select',
            },
            enable_archives: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            default_sort_order: {
                type: DataTypes.ENUM('custom', 'name', 'name_numeric', 'id'),
                defaultValue: 'custom',
            },
            swatch_size: {
                type: DataTypes.ENUM('default', 'large', 'extra_large'),
                defaultValue: 'default',
            },
            show_label: { type: DataTypes.BOOLEAN, defaultValue: true },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Attribute',
            tableName: 'product_attributes',
            timestamps: false,
        }
    );
    return Attribute;
};
