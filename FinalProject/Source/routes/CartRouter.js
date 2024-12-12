import express from "express";
import cartController from "../controllers/CartController.js";


const router = express.Router();

router.get("/cart", cartController.showCartPage);

router.post("/cart", cartController.addProductToCart);

router.put('/cart', cartController.updateQuantity);

router.delete('/cart/:id', cartController.removeProductFromCart);

export default router;