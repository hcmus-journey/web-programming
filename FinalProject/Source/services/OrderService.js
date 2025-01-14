import e from "connect-flash";
import { Product } from "../models/Product.js";
import { Op } from "sequelize";
import { sequelize } from '../config/dbconfig.js';


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
        await Product.update({ quantity: sequelize.literal(`quantity - ${product.quantity}`) }, {
          where: {
            product_id: product.product_id,
            }, 
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

  async searchOrders(userId, sort) {
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

            user_id: userId,
          }
        : {
          user_id: userId
        };

        if(userId === "all") {
          delete whereClause.user_id;
        }

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
    let startDate = null;
    let endDate = null;
    const query = `
    SELECT
        "orderDetail"."product_id" AS "product_id",
        "product"."product_name" AS "product_name",
        SUM("orderDetail"."price") AS "revenue"
    FROM "orders" AS "Order"
    INNER JOIN "order_detail" AS "orderDetail"
        ON "Order"."order_id" = "orderDetail"."order_id"
    INNER JOIN "products" AS "product"
        ON "orderDetail"."product_id" = "product"."product_id"
    WHERE "Order"."created_at" >= :startDate
        AND "Order"."created_at" < :endDate
        AND "Order"."payment_status" = 'PAID'
    GROUP BY "orderDetail"."product_id", "product"."product_name"
    ORDER BY SUM("orderDetail"."price") DESC
    LIMIT 3;
`;
    switch (range) {
      case "day":
        const day_result = {
          period: [],
          total: [],
          top: null,
        };
        let currentHour = 0;

        day_result.period.push(`0:00`);
        day_result.total.push(0);

        while (currentHour < 24) {
          const periodOrders = await this.orderModel.findAll({
            attributes: [
              [this.orderModel.sequelize.fn('SUM', this.orderModel.sequelize.col('total')), 'total_sum'],
            ],
            where: {
              created_at: {
                [Op.gte]: new Date(new Date().setHours(currentHour, 0, 0, 0)),
                [Op.lt]: new Date(new Date().setHours(currentHour + 4, 0, 0, 0)),
              },
              payment_status: "PAID",
            },
            raw: true
          });

          day_result.period.push(`${currentHour + 4}:00`);
          day_result.total.push(periodOrders[0].total_sum || 0);

          currentHour += 4;
        }

        startDate = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
        endDate = new Date(new Date().setHours(24, 0, 0, 0)).toISOString();        
        const dayProducts = await sequelize.query(query, {
          replacements: { startDate, endDate },
          type: sequelize.QueryTypes.SELECT
        });
        day_result.top = dayProducts;
        return day_result;

        
      
      case "week":
        const today = new Date();
        const monday = new Date(today);
        monday.setDate(today.getDate() - (today.getDay() == 0 ? 7 : today.getDay())  + 1);
        monday.setHours(0, 0, 0, 0);
        const nextMonday = new Date(monday);
        nextMonday.setDate(monday.getDate() + 7);

        const week_result = {
          period: [],
          total: [],
          top: null,
        };
        
        for (let i = 0; i < 7; i++) {
          const date = new Date(monday);
          date.setDate(monday.getDate() + i);
          
          const nextDay = new Date(date);
          nextDay.setDate(date.getDate() + 1);

          const periodOrders = await this.orderModel.findAll({
            attributes: [
              [this.orderModel.sequelize.fn('SUM', this.orderModel.sequelize.col('total')), 'total_sum'],
            ],
            where: {
              created_at: {
                [Op.gte]: date,
                [Op.lt]: nextDay,
              },
              payment_status: "PAID",
            },
            raw: true
          });

          week_result.period.push(date.toLocaleDateString('en-US', { weekday: 'long' }));
          week_result.total.push(periodOrders[0].total_sum || 0);
        }

        startDate = monday.toISOString();
        endDate = nextMonday.toISOString();        
        const weekProducts = await sequelize.query(query, {
          replacements: { startDate, endDate },
          type: sequelize.QueryTypes.SELECT
        });

        week_result.top = weekProducts;

        return week_result;
        
      case "month":
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        endOfMonth.setDate(0);

        const month_result = {
          period: [],
          total: [],
          top: null,
        };
        let currentDate = new Date(startOfMonth);

        month_result.period.push(currentDate.getDate());
        month_result.total.push(0);

        while (currentDate < endOfMonth) {
          let endDate = new Date(currentDate);
            endDate.setDate(currentDate.getDate() + 5);
            if (endDate > endOfMonth) {
            endDate = new Date(endOfMonth);
            }

          const periodOrders = await this.orderModel.findAll({
            attributes: [
              [this.orderModel.sequelize.fn('SUM', this.orderModel.sequelize.col('total')), 'total_sum'],
            ],
            where: {
              created_at: {
                [Op.gte]: currentDate,
                [Op.lt]: endDate,
              },
              payment_status: "PAID",
            },
            raw: true
          });

          month_result.period.push(endDate.getDate());
          month_result.total.push(periodOrders[0].total_sum || 0);

          currentDate.setDate(currentDate.getDate() + 5);
        }

        startDate = startOfMonth.toISOString();
        endDate = endOfMonth.toISOString();        
        const monthProducts = await sequelize.query(query, {
          replacements: { startDate, endDate },
          type: sequelize.QueryTypes.SELECT
        });

        month_result.top = monthProducts;

        return month_result
    }
  }

  async updateOrderStatus(orderId, shippingStatus, paymentStatus) {
    try {
      const [updated] = await this.orderModel.update(
        {
          shipping_status: shippingStatus,
          payment_status: paymentStatus,
        },
        {
          where: { order_id: orderId },
        }
      );

      if (!updated) {
        throw new Error("Order not found");
      }

      if(shippingStatus === "SHIPPED" && paymentStatus === "PAID") {
        const order = await this.orderModel.findByPk(
          orderId,
          {
            include: {
              model: this.orderDetailModel,
              as: "orderDetail",
            },
          }
        );
        order.orderDetail.forEach(async (product) => {
          await Product.update({ total_purchases: sequelize.literal(`total_purchases + ${product.quantity}`) }, {
            where: {
              product_id: product.product_id,
              }, 
            });
          });
      }

      if(shippingStatus === "CANCELLED") {
        const order = await this.orderModel.findByPk(orderId,
          {
            include: {
              model: this.orderDetailModel,
              as: "orderDetail",
            },
          });
        order.orderDetail.forEach(async (product) => {
          await Product.update({ quantity: sequelize.literal(`quantity + ${product.quantity}`) }, {
            where: {
              product_id: product.product_id,
              }, 
            });
          });
      }
      
    } catch (error) {
      throw new Error("Error updating order status");
    }
  }
}

export default OrderService;
