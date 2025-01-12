import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbconfig.js';
import { Product } from './Product.js';

export const OrderDetail = sequelize.define('OrderDetail', {
    order_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    product_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
{
  tableName: "order_detail",
  underscored: true,
  timestamps: false,
});

OrderDetail.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
});