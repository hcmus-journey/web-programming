import { Product } from "../models/Product.js";
import { Op } from "sequelize";

class OrderService {
  constructor(orderModel, orderDetailModel) {
    this.orderModel = orderModel;
    this.orderDetailModel = orderDetailModel;
  }

  async createOrder(orderData, orderProducts) {
    try {
      const order = await this.orderModel.create(orderData);

      orderProducts.forEach(async (product) => {
        await this.orderDetailModel.create({
          order_id: order.order_id,
          product_id: product.product_id,
          price: product.price,
          quantity: product.quantity,
        });
      });

      return order
    } catch (error) {
      console.error(error);
      throw new Error("Error creating order");
    }
  }

  async getOrderById(orderId) {
    try {

      const order = await this.orderModel.findOne({
        where: {
          order_id: orderId,
        },
        include: [
          {
            model: this.orderDetailModel,
            as: "orderDetail",
            include: [
              {
                model: Product,
                as: "product",
              },
            ],
          },
        ],
      });

      if (!order) {
        throw new Error("Order not found");
      }

      return order;
    } catch (error) {
      throw new Error("Error retrieving order");
    }
  }

  async getOrdersByUserId(userId) {
    try {
      const orders = await this.orderModel.findAll({
        where: {
          user_id: userId,
        },
        include: {
          model: this.orderDetailModel,
          as: "orderDetail",
          include: {
            model: Product,
            as: "product",
          },
        },
      });

      if (!orders) {
        throw new Error("Order not found");
      }

      return orders;
    } catch (error) {
      throw new Error("Error fetching orders");
    }
  }

  async getAllOrders() {
    try {
      const orders = await this.orderModel.findAll({
        include: {
          model: this.orderDetailModel,
          as: "orderDetail",
          include: {
            model: Product,
            as: "product",
          },
        },
      });

      return orders;
    } catch (error) {
      throw new Error("Error fetching orders");
    }
  }

  async updateOrder(orderId, updateData) {
    try {
      const [updated] = await this.orderModel.update(updateData, {
        where: { order_id: orderId },
      });

      if (!updated) {
        throw new Error("Order not found");
      }

      const updatedOrder = await this.orderModel.findByPk(orderId);

      return updatedOrder;
    } catch (error) {
      throw new Error("Error updating order");
    }
  }

  async searchOrders(sort) {
    let orderClause = [];

    if (sort === "latest") {
      orderClause = [["created_at", "DESC"]];
    } else {
      orderClause = [["created_at", "ASC"]];
    }

    try {
      let query = "";

      const whereClause = query
        ? {
            [Op.or]: [
              { name: { [Op.iLike]: `%${query}%` } },
              { email: { [Op.iLike]: `%${query}%` } },
            ],
          }
        : {};

      const orders = await this.orderModel.findAll({
        where: whereClause,
        order: orderClause,
      });

      return orders;
    } catch (error) {
      console.error("Error searching users:", error.message);
      throw new Error("Failed to search users.");
    }
  }

  async getOrdersByTimeRange(range) {
    
  }
}

export default OrderService;
