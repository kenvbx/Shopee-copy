// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Subscriber extends Model {
        static associate(models) {
            // Model này không có mối quan hệ nào
        }
    }
    Subscriber.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: DataTypes.STRING(191),
                allowNull: false,
                unique: true,
            },
            status: {
                type: DataTypes.ENUM('subscribed', 'unsubscribed'),
                defaultValue: 'subscribed',
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Subscriber',
            tableName: 'subscribers',
            timestamps: false,
        }
    );
    return Subscriber;
};
