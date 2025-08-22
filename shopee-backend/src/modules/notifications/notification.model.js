// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            Notification.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'User',
            });
        }
    }
    Notification.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: DataTypes.BIGINT,
            title: DataTypes.STRING(255),
            content: DataTypes.TEXT,
            type: DataTypes.STRING(50),
            target_id: DataTypes.BIGINT,
            status: {
                type: DataTypes.ENUM('unread', 'read'),
                defaultValue: 'unread',
            },
            sent_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            read_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Notification',
            tableName: 'notifications',
            timestamps: false,
        }
    );
    return Notification;
};
