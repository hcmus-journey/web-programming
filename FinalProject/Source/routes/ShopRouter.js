import express from "express";
import shopController from "../controllers/ShopController.js";

const router = express.Router();

router.get("/shop", shopController.showShopPage);

export default router;

