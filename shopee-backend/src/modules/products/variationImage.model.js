// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class VariationImage extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            VariationImage.belongsTo(models.Variation, {
                foreignKey: 'variation_id',
                as: 'Variation',
            });
        }
    }
    VariationImage.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            variation_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            url: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            position: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
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
            modelName: 'VariationImage',
            tableName: 'variation_images',
            timestamps: false,
        }
    );
    return VariationImage;
};
