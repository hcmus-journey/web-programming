import express from "express";
import orderController from "../controllers/OrderController.js";
import PassportConfig from "../config/PassportConfig.js";

const router = express.Router();
const passportConfig = new PassportConfig();

router.get("/checkout", passportConfig.verifyRole(["USER"]), orderController.showCheckoutPage);
router.post("/checkout", passportConfig.verifyRole(["USER"]), orderController.checkout);

router.get("/orders/:orderId", passportConfig.verifyRole(["USER"]), orderController.showOrderDetail);

router.get("/orders", passportConfig.verifyRole(["USER"]), orderController.showOrderListPage);

export default router;