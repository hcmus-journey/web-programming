import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbconfig.js';
import { ProductImage } from './ProductImage.js';

export const Product = sequelize.define('Product', {
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
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
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
  },
  total_purchases: {
    type: DataTypes.BIGINT,
    allowNull: true,
    defaultValue: 0,
  }
}, {
  tableName: 'products',
  underscored: true,
  timestamps: false,
});

Product.hasMany(ProductImage, {
  foreignKey: 'product_id',
  as: 'images'
});
