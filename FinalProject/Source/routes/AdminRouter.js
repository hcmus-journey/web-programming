import express from "express";
import adminController from "../controllers/AdminController.js";

const router = express.Router();

router.get("/account", adminController.showProfilePage);

router.get("/users", adminController.showUserListPage);

router.put("/account", adminController.updateProfile);

router.put("/users", adminController.actionOnUser);

router.get("/admin_shop", adminController.showAdminPage);
router.get("/edit_product", adminController.showEditProduct);
router.get("/add_product", adminController.showAddProduct);
router.get("/admin_product", adminController.showAdminProduct);

export default router;
