import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbconfig.js";
import { Product } from "./Product.js";

export const Cart = sequelize.define(
  "Cart",
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "carts",
    underscored: true,
    timestamps: false,
  }
);

Cart.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
    });

