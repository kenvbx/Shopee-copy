// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Banner extends Model {
        static associate(models) {
            // Banner không có mối quan hệ trực tiếp nào trong file .sql của bạn
            // nên hàm này có thể để trống
        }
    }
    Banner.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            title: DataTypes.STRING(255),
            image_url: DataTypes.STRING(255),
            link_url: DataTypes.STRING(255),
            position: {
                type: DataTypes.ENUM('homepage', 'category', 'campaign', 'under_slider', 'promo_main'),
                defaultValue: 'homepage',
            },
            status: {
                type: DataTypes.ENUM('active', 'inactive'),
                defaultValue: 'active',
            },
            sort_order: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            start_date: DataTypes.DATE,
            end_date: DataTypes.DATE,
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Banner',
            tableName: 'banners',
            timestamps: false,
        }
    );
    return Banner;
};
