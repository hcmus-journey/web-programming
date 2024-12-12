// routes/productRoutes.js
import express from "express";
import productController from "../controllers/ProductController.js";

const router = express.Router();


// Get product details page
router.get("/product", productController.showProductPage);

export default router;
