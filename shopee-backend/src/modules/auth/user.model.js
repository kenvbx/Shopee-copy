// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../../config/db.config');

const User = sequelize.define(
    'User',
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
        username: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(50),
            defaultValue: 'user',
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        gender: {
            type: DataTypes.ENUM('male', 'female', 'other'),
            defaultValue: 'other',
        },

        birthday: {
            type: DataTypes.DATE,
        },

        avatar: { type: DataTypes.STRING(255) },
        status: {
            type: DataTypes.ENUM('active', 'inactive', 'banned'),
            defaultValue: 'active',
        },
        last_login: { type: DataTypes.DATE },
        reset_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        reset_token_expires: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'users', // Tên bảng trong database
        timestamps: true, // Tự động thêm createdAt và updatedAt
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        hooks: {
            // Tự động băm mật khẩu trước khi tạo người dùng mới
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            // (Tùy chọn) Băm mật khẩu cả khi cập nhật
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
        },
    }
);

module.exports = User;
