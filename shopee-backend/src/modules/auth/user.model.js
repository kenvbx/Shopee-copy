// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ
            User.hasMany(models.UserAddress, {
                foreignKey: 'user_id',
                as: 'Addresses',
            });
            User.hasOne(models.Cart, {
                foreignKey: 'user_id',
                as: 'Cart',
            });
            User.hasMany(models.Order, {
                foreignKey: 'user_id',
                as: 'Orders',
            });
            User.hasMany(models.ProductReview, {
                foreignKey: 'user_id',
                as: 'Reviews',
            });
            User.hasMany(models.Wishlist, {
                foreignKey: 'user_id',
                as: 'WishlistItems',
            });
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING(100),
            username: DataTypes.STRING(100),
            email: {
                type: DataTypes.STRING(100),
                unique: true,
            },
            password: DataTypes.STRING(255),
            role: {
                type: DataTypes.STRING(50),
                defaultValue: 'user',
            },
            phone: DataTypes.STRING(20),
            avatar: DataTypes.STRING(255),
            gender: DataTypes.ENUM('male', 'female', 'other'),
            birthday: DataTypes.DATE,
            status: {
                type: DataTypes.ENUM('active', 'inactive', 'banned'),
                defaultValue: 'active',
            },
            last_login: DataTypes.DATE,
            reset_token: DataTypes.STRING(100),
            reset_token_expires: DataTypes.DATE,
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
            modelName: 'User',
            tableName: 'users',
            timestamps: false,
            hooks: {
                // Tự động băm mật khẩu trước khi tạo hoặc cập nhật user
                beforeSave: async (user, options) => {
                    if (user.changed('password')) {
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);
                    }
                },
            },
        }
    );

    // Thêm một phương thức để kiểm tra mật khẩu
    User.prototype.isValidPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

    return User;
};
