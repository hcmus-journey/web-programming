import express from "express";
import cartController from "../controllers/CartController.js";


const router = express.Router();


router.get("/cart", cartController.showCartPage);

router.get("/checkout", cartController.showCheckoutPage);

export default router;