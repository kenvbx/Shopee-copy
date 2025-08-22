// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

// 1. Export một hàm nhận (sequelize, DataTypes)
module.exports = (sequelize, DataTypes) => {
    // 2. Định nghĩa model theo cấu trúc class
    class UserAddress extends Model {
        static associate(models) {
            // Định nghĩa mối quan hệ tại đây
            UserAddress.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'User',
            });
        }
    }

    // 3. Khởi tạo model với các trường và tùy chọn
    UserAddress.init(
        {
            id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
            user_id: { type: DataTypes.BIGINT, allowNull: false },
            recipient_name: DataTypes.STRING(100),
            phone: DataTypes.STRING(20),
            address: DataTypes.STRING(255),
            city: DataTypes.STRING(100),
            district: DataTypes.STRING(100),
            ward: DataTypes.STRING(100),
            is_default: { type: DataTypes.BOOLEAN, defaultValue: false },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'UserAddress',
            tableName: 'user_addresses',
            timestamps: false, // Tắt timestamps tự động vì bạn đã có created_at
        }
    );

    // 4. Trả về class model đã khởi tạo
    return UserAddress;
};
