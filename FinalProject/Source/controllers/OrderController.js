import PagePath from "../constants/PagePath.js";
import CartService from "../services/CartService.js";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import { Order } from "../models/Order.js";
import { OrderDetail } from "../models/OrderDetail.js";
import OrderService from "../services/OrderService.js";
import HATShopInfo from "../constants/HATShopInfo.js";

class OrderController {
  constructor() {
    this.cartService = new CartService(Cart, Product);
    this.orderService = new OrderService(Order, OrderDetail);
    this.showCheckoutPage = this.showCheckoutPage.bind(this);
    this.checkout = this.checkout.bind(this);
    this.showOrderDetail = this.showOrderDetail.bind(this);
    this.showOrderListPage = this.showOrderListPage.bind(this);
  }

  async showCheckoutPage(req, res) {
    if (req.isAuthenticated()) {
      const cart = await this.cartService.getCart(req.user.user_id);
    const subtotal = cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const isFreeShipping = subtotal >= HATShopInfo.FREE_SHIPPING_THRESHOLD;
    const shippingFee = isFreeShipping ? 0 : (cart.length > 0 ? HATShopInfo.SHIPPING_FEE : 0);
    const total = subtotal + shippingFee;
    res.render(PagePath.CHECKOUT_PAGE_PATH, 
      { 
        isLoggedIn: true, 
        cart: cart, 
        subtotal: subtotal, 
        shippingFee: shippingFee,
        isFreeShipping: isFreeShipping,
        total: total,
      });
    } else {
      res.redirect("/login");
    }
  }

  async checkout(req, res) {
    if (req.isAuthenticated()) {
      const cart = await this.cartService.getCart(req.user.user_id);
      const total = req.body.subtotal + req.body.shippingFee;
      const orderData = {
        user_id: req.user.user_id,
        full_name: req.body.full_name,
        phone: req.body.phone,
        shipping_address: req.body.shipping_address,
        total: total,
        payment_method: req.body.payment_method,
        shipping_fee: req.body.shippingFee,
        shipping_status: "SUSPEND",
        payment_status: "NOT_PAID",
      };
      const orderProducts = cart.map((item) => {
        return {
          product_id: item.product.product_id,
          price: item.product.price,
          quantity: item.quantity,
        };
      });
      try {
        const order = await this.orderService.createOrder(orderData, orderProducts);
        await this.cartService.clearCart(req.user.user_id);
        res.json({
          success: true,
          order_id: order.order_id,
      }); 
      } catch (error) { 
        res.json({
          success: false,
          message: error.message,
        });
      }
    } else {
      res.redirect("/login");
    }
  }

  async showOrderDetail(req, res) {
    if (req.isAuthenticated()) {
      try {
        const order = await this.orderService.getOrderById(req.params.orderId);
        res.render(PagePath.USER_ORDER_DETAIL_PAGE_PATH, { isLoggedIn: true, order: order });
      } catch (error) {
        res.status(500).send("Error loading order");
      }
    } else {
      res.redirect("/login");
    }
  }

  async showOrderListPage(req, res) {
    if (!req.isAuthenticated()) {
      res.redirect('/login');
      return;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const query = req.query.query || "";
    const sort = req.query.sort || "";
  
    try {
      const orders = await this.orderService.searchOrders(query, sort);
      const filteredOrders = orders;
  
      const totalFilteredPages = Math.ceil(filteredOrders.length / limit);
      const paginatedOrders = filteredOrders.slice((page - 1) * limit, page * limit);
  
      if (Object.keys(req.query).length !== 0) {
        const html = await ejs.renderFile("views/pages/shop/orderList.ejs", { orders: paginatedOrders });
        const pagination = await ejs.renderFile("views/layouts/pagination.ejs", { totalPages: totalFilteredPages, currentPage: page });
        return res.json({ html, pagination });
      }

      res.render(PagePath.ORDER_LIST_PAGE_PATH, {
        orders: paginatedOrders,
        totalPages: totalFilteredPages,
        currentPage: page,
        selectedSort: sort,
        isLoggedIn: true,
        selectedFilters: {},
      });

    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Error loading products");
    }
  }
}
 
export default new OrderController();
