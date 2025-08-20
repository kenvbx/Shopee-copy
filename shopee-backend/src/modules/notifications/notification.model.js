// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Notification = sequelize.define(
    'Notification',
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.BIGINT, allowNull: false },
        title: { type: DataTypes.STRING(255) },
        content: { type: DataTypes.TEXT },
        type: { type: DataTypes.STRING(50) },
        target_id: { type: DataTypes.BIGINT },
        status: { type: DataTypes.ENUM('unread', 'read'), defaultValue: 'unread' },
        sent_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        read_at: { type: DataTypes.DATE },
    },
    {
        tableName: 'notifications',
        timestamps: false, // Bảng của bạn đã có sent_at, không dùng timestamps của Sequelize
    }
);

module.exports = Notification;
