import PagePath from "../constants/PagePath.js";
import CartService from "../services/CartService.js";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import { Order } from "../models/Order.js";
import OrderService from "../services/OrderService.js";
import HATShopInfo from "../constants/HATShopInfo.js";

class OrderController {
  constructor() {
    this.cartService = new CartService(Cart, Product);
    this.showCheckoutPage = this.showCheckoutPage.bind(this);
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
    res.render(PagePath.CHECKOUT_PAGE_PATH, 
      { 
        isLoggedIn: true, 
        cart: cart, 
        subtotal: subtotal, 
        shippingFee: shippingFee,
        isFreeShipping: isFreeShipping,
      });
    } else {
      res.redirect("/login");
    }
  }
}

export default new OrderController();
