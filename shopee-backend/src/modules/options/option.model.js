// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Option extends Model {
        static associate(models) {
            // Model này không có mối quan hệ trực tiếp nào
        }
    }
    Option.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            option_name: {
                type: DataTypes.STRING(191),
                allowNull: false,
                unique: true,
            },
            option_value: DataTypes.TEXT('long'),
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
            modelName: 'Option',
            tableName: 'options',
            timestamps: false,
        }
    );
    return Option;
};
