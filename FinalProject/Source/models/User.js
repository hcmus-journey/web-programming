import { DataTypes } from 'sequelize';
import { sequelize } from "../config/dbconfig.js";

export const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4, // Tự động tạo UUID
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_role: {
    type: DataTypes.ENUM('USER', 'ADMIN'),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('BANNED', 'ACTIVE'),
    allowNull: false,
  }
}, {
  tableName: 'users', 
  underscored: true,    
  timestamps: false,   
});