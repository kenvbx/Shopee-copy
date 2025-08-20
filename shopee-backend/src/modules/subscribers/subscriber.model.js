// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Subscriber = sequelize.define(
    'Subscriber',
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING(191), allowNull: false, unique: true, validate: { isEmail: true } },
        status: { type: DataTypes.ENUM('subscribed', 'unsubscribed'), defaultValue: 'subscribed' },
    },
    {
        tableName: 'subscribers',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false,
    }
);

module.exports = Subscriber;
