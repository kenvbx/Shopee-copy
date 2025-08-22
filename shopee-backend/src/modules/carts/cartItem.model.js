// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CartItem extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            CartItem.belongsTo(models.Cart, {
                foreignKey: 'cart_id',
                as: 'Cart',
            });
            CartItem.belongsTo(models.Product, {
                foreignKey: 'product_id',
                as: 'Product',
            });
            CartItem.belongsTo(models.Variation, {
                foreignKey: 'variation_id',
                as: 'Variation',
            });
        }
    }
    CartItem.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            cart_id: DataTypes.BIGINT,
            product_id: DataTypes.BIGINT,
            variation_id: DataTypes.BIGINT,
            quantity: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
            selected: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            added_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'CartItem',
            tableName: 'cart_items',
            timestamps: false,
        }
    );
    return CartItem;
};
