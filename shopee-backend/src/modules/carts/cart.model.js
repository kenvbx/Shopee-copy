// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            Cart.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'User',
            });
            Cart.hasMany(models.CartItem, {
                foreignKey: 'cart_id',
                as: 'CartItems',
            });
        }
    }
    Cart.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: DataTypes.BIGINT,
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
            modelName: 'Cart',
            tableName: 'carts',
            timestamps: false,
        }
    );
    return Cart;
};
