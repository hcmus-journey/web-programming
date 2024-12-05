import { ProductImage } from "../models/ProductImage.js";

class OrderService {
  constructor(cartModel, productModel) {
    this.cartModel = cartModel;
    this.productModel = productModel;
  }
}

export default OrderService;
