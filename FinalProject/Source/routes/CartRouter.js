import express from "express";
import cartController from "../controllers/CartController.js";
import PassportConfig from "../config/PassportConfig.js";

const router = express.Router();
const passportConfig = new PassportConfig();

router.get("/cart", passportConfig.verifyRole(["USER"]), cartController.showCartPage);

router.post("/cart", passportConfig.verifyRole(["USER"]), cartController.addProductToCart);

router.put('/cart', passportConfig.verifyRole(["USER"]), cartController.updateQuantity);

router.delete('/cart/:id', passportConfig.verifyRole(["USER"]), cartController.removeProductFromCart);

export default router;