// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    // Lưu ý: Không có bảng 'variation_attribute_values' trong file .sql của bạn.
    // Model này được tạo ra để có thể định nghĩa các mối quan hệ nếu cần.
    class VariationAttributeValue extends Model {
        static associate(models) {
            // Mối quan hệ Many-to-Many được định nghĩa trong
            // model Variation và AttributeValue.
        }
    }
    VariationAttributeValue.init(
        {
            // Sequelize yêu cầu ít nhất một trường, thường là id.
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            variation_id: {
                type: DataTypes.BIGINT,
                references: {
                    model: 'product_variations', // Tên bảng
                    key: 'id',
                },
            },
            value_id: {
                type: DataTypes.BIGINT,
                references: {
                    model: 'product_attribute_values', // Tên bảng
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            modelName: 'VariationAttributeValue',
            // Giả sử tên bảng trung gian là thế này nếu nó tồn tại
            tableName: 'variation_attribute_values',
            timestamps: false,
        }
    );
    return VariationAttributeValue;
};
