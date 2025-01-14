// routes/productRoutes.js
import express from "express";
import productController from "../controllers/ProductController.js";
import PassportConfig from "../config/PassportConfig.js";
const router = express.Router();
const passportConfig = new PassportConfig();
// Get product details page
router.get("/product", passportConfig.verifyRole(["USER"]), productController.showProductPage);

router.post("/product/:productId/review", passportConfig.verifyRole(["USER"]), productController.postReview);

export default router;
