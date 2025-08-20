// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Wishlist = sequelize.define(
    'Wishlist',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: true, // Cho phép null tạm thời, nhưng nên là false
        },
        product_id: {
            type: DataTypes.BIGINT,
            allowNull: true, // Cho phép null tạm thời, nhưng nên là false
        },
    },
    {
        tableName: 'wishlists',
        timestamps: true, // Báo cho Sequelize biết bảng này có timestamps
        createdAt: 'created_at', // Ánh xạ tới cột created_at
        updatedAt: false, // Bảng của bạn không có cột updated_at
    }
);

module.exports = Wishlist;
