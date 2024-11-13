import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbconfig.js';
import { User } from './User.js';

export const ProductReview = sequelize.define('ProductReview', {
    review_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  detail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'product_reviews',
  underscored: true,
  timestamps: false,
});

// User has many ProductReview
ProductReview.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});
