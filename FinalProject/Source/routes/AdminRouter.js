import express from "express";
import adminController from "../controllers/AdminController.js";
import upload from "../middlewares/upload.js"; // Middleware Multer

const router = express.Router();

router.get("/dashboard", adminController.showProfilePage);

router.get("/users", adminController.showUserListPage);
router.put("/dashboard", adminController.updateProfile);
router.put("/users", adminController.actionOnUser);

// Quản lý sản phẩm
router.get("/admin_shop", adminController.showAdminPage);
router.get("/admin_product", adminController.showAdminProduct);
router.get("/edit_product", adminController.showEditProduct); // Trang chỉnh sửa sản phẩm
router.post("/update_product", adminController.updateProduct); // Xử lý cập nhật sản phẩm
router.get("/add_product", adminController.showAddProduct); // Trang thêm sản phẩm
router.post(
  "/add_new_product",
  upload.array("images", 10),
  adminController.addNewProduct
); // Xử lý thêm sản phẩm

router.get("/add_manufacturer", adminController.showAddManufacturer);
router.post("/add_new_manufacturer", adminController.addNewManufacturer);
router.get("/add_category", adminController.showAddCategory);
router.post("/add_new_category", adminController.addNewCategory);

export default router;
