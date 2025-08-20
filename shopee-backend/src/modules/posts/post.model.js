// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Post = sequelize.define(
    'Post',
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING(255), allowNull: false },
        slug: { type: DataTypes.STRING(255), unique: true },
        content: { type: DataTypes.TEXT('long') },
        excerpt: { type: DataTypes.TEXT },
        featured_image: { type: DataTypes.STRING(255) },
        user_id: { type: DataTypes.BIGINT },
        status: { type: DataTypes.ENUM('published', 'draft'), defaultValue: 'published' },
    },
    {
        tableName: 'posts',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Post;
