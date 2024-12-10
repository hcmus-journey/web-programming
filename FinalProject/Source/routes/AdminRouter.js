import express from "express";
import adminController from "../controllers/AdminController.js";

const router = express.Router();

router.get("/admin", adminController.showAdminPage);
router.get("/edit_product", adminController.showEditProduct);
router.get("/add_product", adminController.showAddProduct);
router.get("/admin_product", adminController.showAdminProduct);

export default router;
