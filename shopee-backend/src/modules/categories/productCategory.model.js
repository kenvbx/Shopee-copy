// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db.config");

const ProductCategory = sequelize.define(
  "ProductCategory",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    parent_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    sort_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING(255),
    },
    icon: {
      type: DataTypes.STRING(255),
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "product_categories",
    timestamps: true,
    paranoid: true,
  },
);

module.exports = ProductCategory;
