import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbconfig.js';

export const ProductManufacturer = sequelize.define('ProductManufacturer', {
    manufacturer_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  manufacturer_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
}, {
  tableName: 'product_manufacturers',
  underscored: true,
  timestamps: false,
});
