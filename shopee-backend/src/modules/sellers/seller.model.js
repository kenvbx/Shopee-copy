// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Seller extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            Seller.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'User',
            });
            Seller.hasMany(models.Product, {
                foreignKey: 'seller_id',
                as: 'Products',
            });
        }
    }
    Seller.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: DataTypes.BIGINT,
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            slug: {
                type: DataTypes.STRING(100),
                unique: true,
            },
            logo: DataTypes.STRING(255),
            cover: DataTypes.STRING(255),
            description: DataTypes.TEXT,
            phone: DataTypes.STRING(20),
            email: {
                type: DataTypes.STRING(100),
                validate: { isEmail: true },
            },
            address: DataTypes.TEXT,
            status: {
                type: DataTypes.ENUM('pending', 'active', 'suspended', 'closed'),
                defaultValue: 'pending',
            },
            is_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
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
            modelName: 'Seller',
            tableName: 'sellers',
            timestamps: true, // Bật timestamps
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return Seller;
};
