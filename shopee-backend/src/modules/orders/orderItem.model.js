// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrderItem extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            OrderItem.belongsTo(models.Order, {
                foreignKey: 'order_id',
                as: 'Order',
            });
            OrderItem.belongsTo(models.Product, {
                foreignKey: 'product_id',
                as: 'Product',
            });
            OrderItem.belongsTo(models.Variation, {
                foreignKey: 'variation_id',
                as: 'Variation',
            });
        }
    }
    OrderItem.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            order_id: DataTypes.BIGINT,
            product_id: DataTypes.BIGINT,
            variation_id: DataTypes.BIGINT,
            product_name: DataTypes.STRING(255),
            sku: DataTypes.STRING(100),
            image_url: DataTypes.STRING(255),
            seller_id: DataTypes.BIGINT,
            status: {
                type: DataTypes.ENUM('pending', 'shipped', 'cancelled', 'refunded', 'completed'),
                defaultValue: 'pending',
            },
            quantity: DataTypes.INTEGER,
            price: DataTypes.DECIMAL(12, 2),
        },
        {
            sequelize,
            modelName: 'OrderItem',
            tableName: 'order_items',
            timestamps: false,
        }
    );
    return OrderItem;
};
