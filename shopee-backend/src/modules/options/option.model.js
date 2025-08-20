// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Option = sequelize.define(
    'Option',
    {
        option_name: { type: DataTypes.STRING, allowNull: false, unique: true },
        option_value: { type: DataTypes.TEXT('long') },
    },
    {
        tableName: 'options',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Option;
