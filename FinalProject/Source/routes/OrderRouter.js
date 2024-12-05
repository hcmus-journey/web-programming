import express from "express";
import orderController from "../controllers/OrderController.js";

const router = express.Router();

router.get("/checkout", orderController.showCheckoutPage);

export default router;