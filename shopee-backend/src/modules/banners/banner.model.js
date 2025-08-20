// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Banner = sequelize.define(
    'Banner',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        link_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        position: {
            type: DataTypes.ENUM('homepage', 'category', 'campaign'),
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
        start_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'banners',
        timestamps: true, // Báo cho Sequelize biết bảng này có timestamps
        createdAt: 'created_at', // Ánh xạ tới cột created_at
        updatedAt: false, // Bảng của bạn không có cột updated_at
    }
);

module.exports = Banner;
