// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Brand extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            Brand.hasMany(models.Product, {
                foreignKey: 'brand_id',
                as: 'Products',
            });
        }
    }
    Brand.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING(100),
            slug: DataTypes.STRING(255),
            parent_id: DataTypes.BIGINT,
            description: DataTypes.TEXT,
            logo_url: DataTypes.STRING(255),
            status: {
                type: DataTypes.ENUM('active', 'inactive'),
                defaultValue: 'active',
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                field: 'createdAt',
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: 'updateAt', // Chú ý: Tên cột trong DB là 'updateAt'
            },
            deletedAt: {
                type: DataTypes.DATE,
                field: 'deletedAt',
            },
        },
        {
            sequelize,
            modelName: 'Brand',
            tableName: 'product_brand',
            timestamps: true, // Bật timestamps vì bạn có các cột này
            // Sequelize sẽ tự động tìm 'createdAt' và 'updatedAt'
            // nhưng vì tên cột của bạn hơi khác, chúng ta cần chỉ định rõ
            createdAt: 'createdAt',

            // Chú ý: Tên cột trong DB của bạn là 'updateAt' và 'deletedAt' (không có 'd')
            // Sequelize mặc định tìm 'updatedAt'. Cần sửa lại cho khớp
            updatedAt: 'updateAt',
            deletedAt: 'deletedAt',
        }
    );
    return Brand;
};
