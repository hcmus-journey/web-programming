import { ProductImage } from "../models/ProductImage.js";

class CartService {
  constructor(cartModel, productModel) {
    this.cartModel = cartModel;
    this.productModel = productModel;
  }

  async getCart(userId) {
    try {
      const cart = await this.cartModel.findAll({
        where: {
          user_id: userId,
        },
        include: [
          {
            model: this.productModel,
            as: "product",
            include: [{ model: ProductImage, as: "images" }],
          },
        ],
      });

      return cart;
    } catch (error) {
      throw new Error("Error fetching cart");
    }
  }

  async addProductToCart(userId, productId, quantity) {
    const product = await this.productModel.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    if (product.quantity < quantity) {
      throw new Error("Not enough stock available");
    }

    let cart = await this.cartModel.findOne({
      where: {
        user_id: userId,
        product_id: productId,
      },
      include: [{ model: this.productModel, as: "product" }],
    });

    if (cart) {
      cart.quantity = parseInt(cart.quantity) + parseInt(quantity);
      if (cart.product.quantity < cart.quantity) {
        throw new Error("You cannot add more than " + cart.product.quantity + " items to the cart");
      }

      await cart.save();
    } else {
      cart = await this.cartModel.create({
        user_id: userId,
        product_id: productId,
        quantity: quantity,
      });
    }

    return cart;
  }

  async updateCartItem(userId, productId, quantity) {
    try {
      const cartItem = await this.cartModel.findOne({
        where: { user_id: userId, product_id: productId },
      });

      if (cartItem) {
        cartItem.quantity = quantity;
        await cartItem.save();

        // Calculate the updated total price
        const cartItems = await this.cartModel.findAll({
          where: {
            user_id: userId,
            product_id: productId,
          },
          include: [{ model: this.productModel, as: "product" }],
        });

        const updatedProductTotal = cartItems.reduce((total, item) => {
          return total + item.product.price * item.quantity;
        }, 0);

        return updatedProductTotal;
      } else {
        throw new Error("Cart item not found");
      }
    } catch (error) {
      throw new Error("Error updating cart item");
    }
  }

  async removeProductFromCart(userId, product_id) {
    try {
      const cartItem = await this.cartModel.findOne({
        where: {
          product_id: product_id,
          user_id: userId,
        },
      });

      if (!cartItem) {
        throw new Error("Cart item not found");
      }

      await cartItem.destroy(); // Remove the item from the database
      return true;
    } catch (error) {
      throw new Error("Error removing product from cart");
    }
  }
}

export default CartService;
