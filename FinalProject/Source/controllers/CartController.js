import PagePath from "../constants/PagePath.js";
import CartService from "../services/CartService.js";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import HATShopInfo from "../constants/HATShopInfo.js";

class CartController {
  constructor() {
    this.cartService = new CartService(Cart, Product);
    this.showCartPage = this.showCartPage.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.removeProductFromCart = this.removeProductFromCart.bind(this);
  }
  async showCartPage(req, res) {
    if (req.isAuthenticated()) {
      const cart = await this.cartService.getCart(req.user.user_id);
      const subtotal = cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      const isFreeShipping = subtotal >= HATShopInfo.FREE_SHIPPING_THRESHOLD;
      const shippingFee = isFreeShipping ? 0 : (cart.length > 0 ? HATShopInfo.SHIPPING_FEE : 0);
      res.render(PagePath.CART_PAGE_PATH, 
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

  async addProductToCart(req, res) {
    if (req.isAuthenticated()) {
      try {
        // Add the product to the cart
        await this.cartService.addProductToCart(
          req.user.user_id,
          req.body.productId,
          req.body.quantity
        );

        // Respond with success message
        return res.json({
          success: true,
          message: "Product added to cart successfully!",
        });
      } catch (error) {
        console.error("Error adding product to cart:", error);

        // Respond with an error message
        return res.json({
          success: false,
          message: error.message,
        });
      }
    } else {
      return res.json({
        success: false,
        message: "Please log in to add products to your cart.",
      });
    }
  }

  async updateQuantity(req, res) {
    if (req.isAuthenticated()) {
      try {
        const updatedProductTotal = await this.cartService.updateCartItem(
          req.user.user_id,
          req.body.product_id,
          req.body.quantity
        );

        res.json({ success: true, updatedProductTotal: updatedProductTotal });
      } catch (error) {
        res.json({ success: false, message: error.message });
      }
    } else {
      return res.json({
        success: false,
        message: "Please log in to update products on your cart.",
      });
    }
  }

  async removeProductFromCart(req, res) {
    try {
      const product_id = req.params.id;
      // Call the service to remove the product from the cart
      await this.cartService.removeProductFromCart(
        req.user.user_id,
        product_id
      );

      // Respond with the updated cart and subtotal
      res.json({ success: true });
    } catch (error) {
      console.error("Error removing product from cart:", error.message);
      res
        .status(500)
        .json({
          success: false,
          message: "Failed to remove product from cart",
        });
    }
  }
}

export default new CartController();
