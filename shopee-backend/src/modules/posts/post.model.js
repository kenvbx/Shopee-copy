// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            // Nó có một foreign key là author_id trỏ đến bảng users.
            Post.belongsTo(models.User, {
                foreignKey: 'author_id',
                as: 'Author',
            });
        }
    }
    Post.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            title: DataTypes.STRING(255),
            slug: DataTypes.STRING(255),
            content: DataTypes.TEXT,
            summary: DataTypes.TEXT,
            image_url: DataTypes.STRING(255),
            author_id: DataTypes.BIGINT,
            tags: DataTypes.STRING(255),
            status: {
                type: DataTypes.ENUM('draft', 'published', 'hidden'),
                defaultValue: 'draft',
            },
            published_at: DataTypes.DATE,
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
            // Chú ý: Tên model có thể là 'Post' nhưng bảng trong DB là 'blogs'
            modelName: 'Post',
            tableName: 'blogs',
            timestamps: false,
        }
    );
    return Post;
};
