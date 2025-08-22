// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            Order.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'User',
            });
            Order.hasMany(models.OrderItem, {
                foreignKey: 'order_id',
                as: 'OrderItems',
            });
            Order.belongsTo(models.UserAddress, {
                foreignKey: 'address_id',
                as: 'ShippingAddress',
            });
        }
    }
    Order.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: DataTypes.BIGINT,
            seller_id: DataTypes.BIGINT,
            address_id: DataTypes.BIGINT,
            total: DataTypes.DECIMAL(12, 2),
            shipping_fee: DataTypes.DECIMAL(12, 2),
            voucher_id: DataTypes.BIGINT,
            status: {
                type: DataTypes.ENUM('pending', 'paid', 'shipped', 'completed', 'cancelled', 'returned'),
                defaultValue: 'pending',
            },
            shipping_status: {
                type: DataTypes.ENUM('not_yet', 'shipping', 'delivered'),
                defaultValue: 'not_yet',
            },
            payment_status: {
                type: DataTypes.ENUM('unpaid', 'paid', 'refunded'),
                defaultValue: 'unpaid',
            },
            payment_method: DataTypes.STRING(50),
            receiver_name: DataTypes.STRING(100),
            receiver_phone: DataTypes.STRING(20),
            receiver_address: DataTypes.TEXT,
            note: DataTypes.TEXT,
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Order',
            tableName: 'orders',
            timestamps: false,
        }
    );
    return Order;
};
