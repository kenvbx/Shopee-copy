// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ProductCategory extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            ProductCategory.belongsToMany(models.Product, {
                through: 'product_category_map', // Tên bảng trung gian
                foreignKey: 'category_id',
                otherKey: 'product_id',
                as: 'Products',
            });
        }
    }
    ProductCategory.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            slug: DataTypes.STRING(255),
            parent_id: DataTypes.BIGINT,
            description: DataTypes.TEXT,
            sort_order: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            image: DataTypes.STRING(255),
            icon: DataTypes.STRING(255),
            status: {
                type: DataTypes.ENUM('active', 'inactive'),
                defaultValue: 'active',
            },
            is_featured: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                field: 'createdAt',
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                field: 'updatedAt',
            },
            deletedAt: {
                type: DataTypes.DATE,
                field: 'deletedAt',
            },
        },
        {
            sequelize,
            modelName: 'ProductCategory',
            tableName: 'product_categories',
            timestamps: true, // Bật timestamps
            paranoid: true, // Bật soft delete (sử dụng cột deletedAt)
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            deletedAt: 'deletedAt',
        }
    );
    return ProductCategory;
};
