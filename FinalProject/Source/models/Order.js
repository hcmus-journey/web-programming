import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbconfig.js';
import { OrderDetail } from './OrderDetail.js'

export const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4, 
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  shipping_address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  shipping_fee: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, 
    allowNull: false,
  },
  shipping_status: {
    type: DataTypes.ENUM('SUSPEND','SHIPPING','SHIPPED'),
    allowNull: false,
  },
  payment_status: {
    type: DataTypes.ENUM('PAID','NOT_PAID'),
    allowNull: false
  }
}, {
  tableName: 'orders', 
  underscored: true,   
  timestamps: false     
});

Order.hasMany(OrderDetail, {
  foreignKey: 'order_id',
  as: 'orderDetail',
});
