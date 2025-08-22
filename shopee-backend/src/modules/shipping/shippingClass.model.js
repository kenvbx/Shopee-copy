// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ShippingClass extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            ShippingClass.hasMany(models.Product, {
                foreignKey: 'shipping_class_id',
                as: 'Products',
            });
        }
    }
    ShippingClass.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            slug: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            description: DataTypes.TEXT,
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
            modelName: 'ShippingClass',
            tableName: 'shipping_classes',
            timestamps: false,
        }
    );
    return ShippingClass;
};
