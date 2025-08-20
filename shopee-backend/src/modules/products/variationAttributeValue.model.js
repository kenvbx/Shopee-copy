// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const VariationAttributeValue = sequelize.define(
    'VariationAttributeValue',
    {
        variation_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        attribute_value_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
    },
    {
        tableName: 'variation_attribute_values',
        timestamps: false,
    }
);

module.exports = VariationAttributeValue;
