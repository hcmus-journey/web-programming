import express from "express";
import shopController from "../controllers/ShopController.js";
import PassportConfig from "../config/PassportConfig.js";

const router = express.Router();
const passportConfig = new PassportConfig();
router.get("/shop", passportConfig.verifyRole(["USER"]), shopController.showShopPage);

export default router;

