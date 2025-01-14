import express from "express";
import adminController from "../controllers/AdminController.js";
import accountController from "../controllers/AccountController.js";
import upload from "../middlewares/upload.js"; // Middleware Multer

const router = express.Router();

router.get("/account", adminController.showProfilePage);

router.get("/users", adminController.showUserListPage);

router.put("/account", upload.single("image"), accountController.updateProfile);

router.put("/users", adminController.actionOnUser);

// Quản lý sản phẩm
router.get("/admin_shop", adminController.showAdminPage);
router.get("/admin_product", adminController.showAdminProduct);
router.get("/edit_product", adminController.showEditProduct); // Trang chỉnh sửa sản phẩm
router.post(
  "/edit_product",
  upload.array("images", 10),
  adminController.updateProduct
); // Xử lý cập nhật sản phẩm
router.get("/add_product", adminController.showAddProduct); // Trang thêm sản phẩm
router.post(
  "/add_new_product",
  upload.array("images", 10),
  adminController.addNewProduct
); // Xử lý thêm sản phẩm

// Quản lý đơn hàng
router.get("/orders", adminController.showOrderListPage);
router.get("/orders/:orderId", adminController.showOrderDetail);
router.post("/orders/:orderId", adminController.updateOrder);

// Quản lý danh mục và nhà sản xuất
router.get("/manage_manufacturer", adminController.showAddManufacturer);
router.post("/manage_manufacturer", adminController.manageManufacturer);
router.get("/manage_category", adminController.showAddCategory);
router.post("/manage_category", adminController.manageCategory);

export default router;
