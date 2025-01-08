import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbconfig.js';

export const OrderDetail = sequelize.define('OrderDetail', {
    order_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    }
},
{
  tableName: "order_detail",
  underscored: true,
  timestamps: false,
}
);