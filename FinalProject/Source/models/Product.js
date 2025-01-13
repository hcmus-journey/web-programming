import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbconfig.js";
import { ProductImage } from "./ProductImage.js";
import { ProductCategory } from "./ProductCategory.js";
import { ProductManufacturer } from "./ProductManufacturer.js";
import { ProductReview } from "./ProductReview.js";

export const Product = sequelize.define(
  "Product",
  {
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "IN_STOCK",
    },
    total_purchases: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    tableName: "products",
    underscored: true,
    timestamps: false,
  }
);

Product.hasMany(ProductImage, {
  foreignKey: "product_id",
  as: "images",
});

// Product belongs to ProductCategory (Product has a foreign key 'category_id')
Product.belongsTo(ProductCategory, {
  foreignKey: "category_id",
  as: "category", // Alias to use when including category in queries
});

// Product belongs to ProductManufacturer (Product has a foreign key 'manufacturer_id')
Product.belongsTo(ProductManufacturer, {
  foreignKey: "manufacturer_id",
  as: "manufacturer", // Alias to use when including manufacturer in queries
});

// Product has many ProductReview
Product.hasMany(ProductReview, {
  foreignKey: "product_id",
  as: "reviews",
});

