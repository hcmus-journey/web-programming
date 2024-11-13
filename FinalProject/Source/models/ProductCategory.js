import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbconfig.js';

export const ProductCategory = sequelize.define('ProductCategory', {
    category_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  category_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
}, {
  tableName: 'product_categories',
  underscored: true,
  timestamps: false,
});
