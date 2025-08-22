// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Wishlist extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            Wishlist.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'User',
            });
            Wishlist.belongsTo(models.Product, {
                foreignKey: 'product_id',
                as: 'Product',
            });
        }
    }
    Wishlist.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: DataTypes.BIGINT,
            product_id: DataTypes.BIGINT,
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Wishlist',
            tableName: 'wishlists',
            timestamps: false,
        }
    );
    return Wishlist;
};
