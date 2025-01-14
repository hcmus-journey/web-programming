import PagePath from "../constants/PagePath.js";
import UserService from "../services/UserService.js";
import { User } from "../models/User.js";
import AdminService from "../services/AdminService.js";
import ProductService from "../services/ProductService.js";
import OrderService from "../services/OrderService.js";
import { Order } from "../models/Order.js";
import { OrderDetail } from "../models/OrderDetail.js";
import ejs from "ejs";
import { v4 as uuidv4 } from "uuid"; // Import hàm tạo UUID
import uploadImageToS3 from "../utils/uploadToS3.js"; // Hàm upload ảnh

class AdminController {
  constructor() {
    this.userService = new UserService(User);
    this.orderService = new OrderService(Order, OrderDetail);
    this.showProfilePage = this.showProfilePage.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.showUserListPage = this.showUserListPage.bind(this);
    this.actionOnUser = this.actionOnUser.bind(this);
    this.showAdminPage = this.showAdminPage.bind(this);
    this.showAddProduct = this.showAddProduct.bind(this);
    this.addNewProduct = this.addNewProduct.bind(this);
    this.showEditProduct = this.showEditProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.showAdminProduct = this.showAdminProduct.bind(this);
    this.showDashboard = this.showDashboard.bind(this);
    this.showOrderDetail = this.showOrderDetail.bind(this);
    this.showOrderListPage = this.showOrderListPage.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
  }
  async showProfilePage(req, res) {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    }
    const user = req.user;
    res.render(PagePath.ADMIN_ACCOUNT_PAGE_PATH, {
      user: user,
      isLoggedIn: true,
      successMessage: req.flash("success"),
      errorMessage: req.flash("error"),
    });
  }

  async showUserListPage(req, res) {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const query = req.query.query || "";
    const sort = req.query.sort || "";

    try {
      const users = await AdminService.searchUsers(query, sort);
      const filteredUsers = users;

      const totalFilteredPages = Math.ceil(filteredUsers.length / limit);
      const paginatedUsers = filteredUsers.slice(
        (page - 1) * limit,
        page * limit
      );

      if (Object.keys(req.query).length !== 0) {
        const html = await ejs.renderFile("views/pages/admin/userList.ejs", {
          users: paginatedUsers,
          user: req.user,
        });
        const pagination = await ejs.renderFile(
          "views/layouts/pagination.ejs",
          { totalPages: totalFilteredPages, currentPage: page }
        );
        return res.json({ html, pagination });
      }

      const user = req.user;
      res.render(PagePath.USER_LIST_PAGE_PATH, {
        user,
        users: paginatedUsers,
        totalPages: totalFilteredPages,
        currentPage: page,
        selectedSort: sort,
        isLoggedIn: true,
        selectedFilters: {},
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.json({ success: false, message: error.message });
    }
  }

  async updateProfile(req, res) {
    if (req.isAuthenticated()) {
      const userData = {
        name: req.body.name,
      };
      try {
        this.userService.updateUser(req.user.user_id, userData);
        res.json({ success: true, message: "Profile updated!" });
      } catch (error) {
        res.json({ success: false, message: error.message });
      }
    } else {
      res.redirect("/login");
    }
  }

  async showAdminPage(req, res) {
    const user = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const query = req.query.query || "";
    const brandVal = req.query.manufacturers
      ? req.query.manufacturers.split(",")
      : [];
    const catVal = req.query.categories ? req.query.categories.split(",") : [];
    const sort = req.query.sort || "";
    const minPrice = req.query.minPrice
      ? parseFloat(req.query.minPrice)
      : undefined;
    const maxPrice = req.query.maxPrice
      ? parseFloat(req.query.maxPrice)
      : undefined;
    const status = req.query.status || undefined;

    try {
      const products = await ProductService.searchProducts(query, sort);
      const filteredProducts = products
        .filter(
          (product) =>
            catVal.length === 0 ||
            catVal.includes(product.category_id.toString())
        )
        .filter(
          (product) =>
            brandVal.length === 0 ||
            brandVal.includes(product.manufacturer_id.toString())
        )
        .filter((product) => isNaN(minPrice) || product.price >= minPrice)
        .filter((product) => isNaN(maxPrice) || product.price <= maxPrice)
        .filter((product) => !status || product.status === status);

      const totalFilteredPages = Math.ceil(filteredProducts.length / limit);
      const paginatedProducts = filteredProducts.slice(
        (page - 1) * limit,
        page * limit
      );

      if (Object.keys(req.query).length !== 0) {
        const html = await ejs.renderFile(
          "views/layouts/admin_productList.ejs",
          {
            productList: paginatedProducts,
          }
        );
        const pagination = await ejs.renderFile(
          "views/layouts/pagination.ejs",
          { totalPages: totalFilteredPages, currentPage: page }
        );
        return res.json({ html, pagination });
      }

      const categories = await ProductService.getAllCategories();
      const manufacturers = await ProductService.getAllManufacturer();

      res.render(PagePath.ADMIN_SHOP_PATH, {
        products: paginatedProducts,
        totalPages: totalFilteredPages,
        currentPage: page,
        selectedSort: sort,
        categories: categories,
        manufacturers: manufacturers,
        user,
        isLoggedIn: true,
        selectedFilters: {
          categories: catVal,
          manufacturers: brandVal,
          minPrice,
          maxPrice,
          status,
        },
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Error loading products");
    }
  }

  async showAddProduct(req, res) {
    try {
      const user = req.user;
      const categories = await ProductService.getAllCategories();
      const manufacturers = await ProductService.getAllManufacturer();

      res.render(PagePath.ADD_PRODUCT_PATH, {
        user,
        isLoggedIn: true,
        categories,
        manufacturers,
      });
    } catch (error) {
      console.error("Error fetching category and manufacturer:", error);
      res
        .status(500)
        .send(`Error loading category and manufacturer: ${error.message}`);
    }
  }

  async addNewProduct(req, res) {
    const { product_name, category, quantity, price, manufacturer, detail } =
      req.body;
    const user = req.user;
    const categories = await ProductService.getAllCategories(); // Lấy toàn bộ Category
    const manufacturers = await ProductService.getAllManufacturer(); // Lấy toàn bộ Manufacturer

    // Kiểm tra dữ liệu đầu vào
    if (!product_name || !category || !quantity || !price || !manufacturer) {
      return res.status(400).json({ error: "Missing required fields!" });
    }

    try {
      // Kiểm tra và lấy category_id từ bảng Category
      const categoryRecord = categories.find(
        (cat) => cat.category_name === category
      );
      if (!categoryRecord) {
        throw new Error("Category không tồn tại!");
      }

      // Kiểm tra và lấy manufacturer_id từ bảng Manufacturer
      const manufacturerRecord = manufacturers.find(
        (manu) => manu.manufacturer_name === manufacturer
      );
      if (!manufacturerRecord) {
        throw new Error("Manufacturer không tồn tại!");
      }

      // Tải ảnh lên S3
      const imageUrls = [];
      for (let i = 0; i < req.files.length; i++) {
        const imageUrl = await uploadImageToS3(req.files[i]);
        imageUrls.push(imageUrl);
      }

      const product_id = uuidv4(); // Tạo UUID cho product_id
      // Tạo đối tượng sản phẩm mới
      const productImages = imageUrls.map((url) => ({
        img_id: uuidv4(),
        product_id: product_id,
        img_src: url,
      }));
      const newProduct = {
        product_id: product_id,
        product_name: product_name,
        category_id: categoryRecord.category_id, // Sử dụng ID từ category
        quantity: parseInt(quantity), // Chuyển đổi sang số nguyên
        price: parseFloat(price), // Chuyển đổi sang số thập phân
        manufacturer_id: manufacturerRecord.manufacturer_id, // Sử dụng ID từ manufacturer
        detail: detail,
      };

      // Gọi service để lưu sản phẩm
      await ProductService.createProduct(newProduct);

      await ProductService.createProductImages(productImages);

      // Chuyển hướng về trang quản lý sản phẩm
      res.redirect("/admin/admin_shop");
    } catch (error) {
      console.error("Error adding product:", error.message);

      // Render lại trang thêm sản phẩm với thông báo lỗi
      res.render(PagePath.ADD_PRODUCT_PATH, {
        user,
        isLoggedIn: true,
        categories,
        manufacturers,
        error: error.message || "Đã có lỗi xảy ra!",
      });
    }
  }

  async showEditProduct(req, res) {
    const productId = req.query.id;

    if (!productId) {
      console.error("No product ID provided");
      return res.redirect(PagePath.ADMIN_SHOP_PATH);
    }

    try {
      const product = await ProductService.getProductById(productId);
      const categories = await ProductService.getAllCategories();
      const manufacturers = await ProductService.getAllManufacturer();

      if (!product) {
        console.error("Product not found");
        return res.redirect(PagePath.ADMIN_SHOP_PATH);
      }

      const user = req.user;
      res.render(PagePath.EDIT_PRODUCT_PATH, {
        user,
        isLoggedIn: true,
        product,
        categories,
        manufacturers,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).send(`Error loading product: ${error.message}`);
    }
  }

  async updateProduct(req, res) {
    const {
      product_id,
      product_name,
      category,
      quantity,
      price,
      manufacturer,
      detail,
    } = req.body;
    const user = req.user;
    const categories = await ProductService.getAllCategories(); // Lấy toàn bộ Category
    const manufacturers = await ProductService.getAllManufacturer(); // Lấy toàn bộ Manufacturer

    // Kiểm tra dữ liệu đầu vào
    if (!product_name || !category || !quantity || !price || !manufacturer) {
      return res.status(400).json({ error: "Missing required fields!" });
    }

    try {
      // Kiểm tra và lấy category_id từ bảng Category
      const categoryRecord = categories.find(
        (cat) => cat.category_name === category
      );
      if (!categoryRecord) {
        throw new Error("Category không tồn tại!");
      }

      // Kiểm tra và lấy manufacturer_id từ bảng Manufacturer
      const manufacturerRecord = manufacturers.find(
        (manu) => manu.manufacturer_name === manufacturer
      );
      if (!manufacturerRecord) {
        throw new Error("Manufacturer không tồn tại!");
      }

      // Tải ảnh lên S3
      const imageUrls = [];
      for (let i = 0; i < req.files.length; i++) {
        const imageUrl = await uploadImageToS3(req.files[i]);
        imageUrls.push(imageUrl);
      }
      // Tạo đối tượng sản phẩm mới
      const productImages = imageUrls.map((url) => ({
        img_id: uuidv4(),
        product_id: product_id,
        img_src: url,
      }));
      const product = {
        product_id: product_id,
        product_name: product_name,
        category_id: categoryRecord.category_id, // Sử dụng ID từ category
        quantity: parseInt(quantity), // Chuyển đổi sang số nguyên
        price: parseFloat(price), // Chuyển đổi sang số thập phân
        manufacturer_id: manufacturerRecord.manufacturer_id, // Sử dụng ID từ manufacturer
        detail: detail,
      };

      // Gọi service để lưu sản phẩm
      await ProductService.updateProduct(product_id, product);

      if (imageUrls.length > 0) {
        await ProductService.updateProductImages(product_id, productImages);
      }

      // Chuyển hướng về trang quản lý sản phẩm
      res.redirect("/admin/admin_shop");
    } catch (error) {
      console.error("Error adding product:", error.message);

      // Render lại trang thêm sản phẩm với thông báo lỗi
      res.render(PagePath.ADD_PRODUCT_PATH, {
        user,
        isLoggedIn: true,
        categories,
        manufacturers,
        error: error.message || "Đã có lỗi xảy ra!",
      });
    }
  }

  async showAdminProduct(req, res) {
    const productId = req.query.id;
    try {
      const product = await ProductService.getProductById(productId);
      const relatedProducts = await ProductService.getRelatedProducts(
        productId
      );

      if (!product) {
        console.error("Product not found");
        return res.render(PagePath.NOT_FOUND_PAGE_PATH);
      }

      const user = req.user;
      res.render(PagePath.ADMIN_PRODUCT_PATH, {
        user,
        isLoggedIn: true,
        product,
        relatedProducts,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  async actionOnUser(req, res) {
    if (req.isAuthenticated()) {
      const userActionData = {
        status: req.body.status,
      };

      try {
        this.userService.updateUser(req.body.id, userActionData);
        const action = req.body.status == "ACTIVE" ? "unbanned" : "banned";

        res.json({
          success: true,
          message: "User " + action + " successfully!",
        });
      } catch (error) {
        res.json({ success: false, message: error.message });
      }
    } else {
      res.redirect("/login");
    }
  }

  async showDashboard(req, res) {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    }

    const timeRange = req.query.timeRange || "day";

    try {
      const revenueData = await this.orderService.getOrdersByTimeRange(
        timeRange
      );

      if (Object.keys(req.query).length !== 0) {
        const html = await ejs.renderFile(
          "views/pages/admin/dashboardReport.ejs",
          { revenueData, timeRange }
        );
        const revenue = JSON.stringify(revenueData);
        return res.json({ html, revenue });
      }

      res.render(PagePath.DASHBOARD_PAGE_PATH, {
        revenueData,
        timeRange,
        isLoggedIn: true,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.json({ success: false, message: error.message });
    }
  }

  async showOrderDetail(req, res) {
    if (req.isAuthenticated()) {
      try {
        const order = await this.orderService.getOrderById(req.params.orderId);

        res.render(PagePath.ADMIN_ORDER_DETAIL_PATH, {
          isLoggedIn: true,
          order: order,
        });
      } catch (error) {
        res.status(500).send("Error loading order");
      }
    } else {
      res.redirect("/login");
    }
  }

  async showOrderListPage(req, res) {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const sort = req.query.sort || "";
    const userId = req.user.user_id;

    try {
      const orders = await this.orderService.searchOrders("all", sort);
      const filteredOrders = orders;

      const totalFilteredPages = Math.ceil(filteredOrders.length / limit);
      const paginatedOrders = filteredOrders.slice(
        (page - 1) * limit,
        page * limit
      );

      if (Object.keys(req.query).length !== 0) {
        const html = await ejs.renderFile("views/pages/admin/orderList.ejs", {
          orders: paginatedOrders,
        });
        const pagination = await ejs.renderFile(
          "views/layouts/pagination.ejs",
          { totalPages: totalFilteredPages, currentPage: page }
        );
        return res.json({ html, pagination });
      }

      res.render(PagePath.ADMIN_ORDER_LIST_PATH, {
        orders: paginatedOrders,
        totalPages: totalFilteredPages,
        currentPage: page,
        selectedSort: sort,
        isLoggedIn: true,
        selectedFilters: {},
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Error loading products");
    }
  }

  async updateOrder(req, res) {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    }

    const orderId = req.params.orderId;
    const shippingStatus = req.body.shippingStatus;
    const paymentStatus = req.body.paymentStatus;

    try {
      await this.orderService.updateOrderStatus(
        orderId,
        shippingStatus,
        paymentStatus
      );
      res.json({ success: true, message: "Order updated successfully!" });
    } catch (error) {
      console.error("Error updating order:", error);
      res.json({ success: false, message: "Failed to update order" });
    }
  }

  async showAddManufacturer(req, res) {
    try {
      const user = req.user;
      const manufacturers = await ProductService.getAllManufacturer();

      res.render(PagePath.ADD_MANUFACTURER_PATH, {
        user,
        isLoggedIn: true,
        manufacturers,
      });
    } catch (error) {
      console.error("Error fetching manufacturer:", error);
      res.status(500).send(`Error loading manufacturer: ${error.message}`);
    }
  }

  async manageManufacturer(req, res) {
    const user = req.user;
    const manufacturers = await ProductService.getAllManufacturer(); // Lấy danh sách manufacturers
    const { selected_manufacturer, manufacturer_name, action } = req.body;

    try {
      if (action === "add") {
        // Thêm nhà sản xuất mới
        const manufacturer_id = uuidv4();
        const newManufacturer = {
          manufacturer_id: manufacturer_id,
          manufacturer_name: manufacturer_name,
        };

        await ProductService.createManufacturer(newManufacturer);

        return res.render(PagePath.ADD_MANUFACTURER_PATH, {
          user,
          isLoggedIn: true,
          manufacturers: await ProductService.getAllManufacturer(), // Cập nhật danh sách manufacturers
          successMessage: "Manufacturer added successfully!",
        });
      } else if (action === "edit") {
        // Tìm manufacturer đã chọn
        const manufacturerRecord = manufacturers.find(
          (manu) => manu.manufacturer_name === selected_manufacturer
        );

        if (!manufacturerRecord) {
          throw new Error("The selected manufacturer does not exist!");
        }

        // Gửi yêu cầu cập nhật
        await ProductService.updateManufacturer(
          manufacturerRecord.manufacturer_id,
          {
            manufacturer_name: manufacturer_name,
          }
        );

        return res.redirect("/admin/manage_manufacturer");
      }
    } catch (error) {
      console.error("Error managing manufacturer:", error.message);

      return res.redirect("/admin/manage_manufacturer");
    }
  }

  async showAddCategory(req, res) {
    try {
      const user = req.user;
      const categories = await ProductService.getAllCategories(); // Lấy danh sách Category

      res.render(PagePath.ADD_CATEGORY_PATH, {
        user,
        isLoggedIn: true,
        categories,
      });
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).send(`Error loading category: ${error.message}`);
    }
  }

  async manageCategory(req, res) {
    const user = req.user;
    const categories = await ProductService.getAllCategories(); // Lấy danh sách Category
    const { selected_category, category_name, action } = req.body;

    try {
      if (action === "add") {
        // Thêm nhà sản xuất mới
        const category_id = uuidv4();
        const newCategory = {
          category_id: category_id,
          category_name: category_name,
        };

        await ProductService.createCategory(newCategory);

        return res.render(PagePath.ADD_CATEGORY_PATH, {
          user,
          isLoggedIn: true,
          categories: await ProductService.getAllCategories(), // Cập nhật danh sách Category
          successMessage: "Category added successfully!",
        });
      } else if (action === "edit") {
        // Tìm Category đã chọn
        const categoryRecord = categories.find(
          (cate) => cate.category_name === selected_category
        );

        if (!categoryRecord) {
          throw new Error("The selected category does not exist!");
        }

        // Gửi yêu cầu cập nhật
        await ProductService.updateCategory(categoryRecord.category_id, {
          category_name: category_name,
        });

        return res.redirect("/admin/manage_category");
      }
    } catch (error) {
      console.error("Error managing category:", error.message);

      return res.redirect("/admin/manage_category");
    }
  }
}

export default new AdminController();
