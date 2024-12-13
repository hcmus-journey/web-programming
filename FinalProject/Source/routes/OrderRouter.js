import express from "express";
import orderController from "../controllers/OrderController.js";
import PassportConfig from "../config/PassportConfig.js";

const router = express.Router();
const passportConfig = new PassportConfig();

router.get("/checkout", passportConfig.verifyRole(["USER"]), orderController.showCheckoutPage);

export default router;