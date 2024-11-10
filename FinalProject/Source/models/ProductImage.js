import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbconfig.js';

export const ProductImage = sequelize.define('ProductImage', {
  img_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  img_src: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
}, {
  tableName: 'product_images',
  underscored: true,
  timestamps: false,
});
