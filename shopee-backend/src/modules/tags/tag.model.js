// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Tag extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            Tag.belongsToMany(models.Product, {
                through: 'product_tag_map', // Tên bảng trung gian
                foreignKey: 'tag_id',
                otherKey: 'product_id',
                as: 'Products',
            });
        }
    }
    Tag.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            slug: DataTypes.STRING(100),
            description: DataTypes.STRING(255),
            status: {
                type: DataTypes.ENUM('active', 'inactive'),
                defaultValue: 'active',
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Tag',
            tableName: 'product_tags',
            timestamps: false,
        }
    );
    return Tag;
};
