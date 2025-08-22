// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AttributeValue extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            AttributeValue.belongsTo(models.Attribute, {
                foreignKey: 'attribute_id',
                as: 'Attribute',
            });
            AttributeValue.belongsToMany(models.Product, {
                through: 'product_attribute_value_map', // Tên bảng trung gian
                foreignKey: 'value_id',
                otherKey: 'product_id',
                as: 'Products',
            });
        }
    }
    AttributeValue.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            attribute_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            value: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            slug: DataTypes.STRING(100),
            description: DataTypes.TEXT,
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'AttributeValue',
            tableName: 'product_attribute_values',
            timestamps: false,
        }
    );
    return AttributeValue;
};
