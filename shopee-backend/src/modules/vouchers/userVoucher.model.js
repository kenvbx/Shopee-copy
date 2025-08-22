// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserVoucher extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            UserVoucher.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'User',
            });
            UserVoucher.belongsTo(models.Voucher, {
                foreignKey: 'voucher_id',
                as: 'Voucher',
            });
        }
    }
    UserVoucher.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            voucher_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('unused', 'used', 'expired'),
                defaultValue: 'unused',
            },
            used_at: DataTypes.DATE,
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'UserVoucher',
            tableName: 'user_vouchers',
            timestamps: false,
        }
    );
    return UserVoucher;
};
