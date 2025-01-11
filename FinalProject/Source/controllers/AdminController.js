import PagePath from "../constants/PagePath.js";
import UserService from "../services/UserService.js";
import { User } from "../models/User.js";
import AdminService from "../services/AdminService.js";
import ProductService from "../services/ProductService.js";
import ejs from "ejs";

class AdminController {
  constructor() {
    this.userService = new UserService(User);
    this.showPRofilePage = this.showProfilePage.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.showUserListPage = this.showUserListPage.bind(this);
  }
  async showProfilePage(req, res) {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    }
    const user = req.user;
    res.render(PagePath.ADMIN_PAGE_PATH, {
      user,
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
        const html = await ejs.renderFile("views/layouts/userList.ejs", {
          users: paginatedUsers,
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
      console.error("Error fetching products:", error);
      res.status(500).send("Error loading products");
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
      res.redirect("/");
    }
  }
  async showAdminPage(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const query = req.query.query || ""; // Lấy từ khóa tìm kiếm
    const brandVal = req.query.manufacturers
      ? req.query.manufacturers.split(",")
      : [];
    const catVal = req.query.categories ? req.query.categories.split(",") : [];
    const sort = req.query.sort || ""; // Lấy giá trị sort
    const minPrice =
      req.query.minPrice !== undefined
        ? parseFloat(req.query.minPrice)
        : undefined;
    const maxPrice =
      req.query.maxPrice !== undefined
        ? parseFloat(req.query.maxPrice)
        : undefined;
    const status = req.query.status || undefined;

    try {
      // Lọc theo Category & Manufacturer
      const categories = await ProductService.getAllCategories(); // Lấy toàn bộ Category
      const manufacturers = await ProductService.getAllManufacturer(); // Lấy toàn bộ Manufacturer

      // Tìm kiếm theo tên sản phẩm
      const products = await ProductService.searchProducts(
        query,
        "product_name",
        sort
      );

      // Lọc sản phẩm theo các tiêu chí
      let filteredProducts = products;

      if (catVal.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          catVal.includes(product.category_id.toString())
        );
      }

      if (brandVal.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          brandVal.includes(product.manufacturer_id.toString())
        );
      }

      if (!isNaN(minPrice)) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= minPrice
        );
      }

      if (!isNaN(maxPrice)) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price <= maxPrice
        );
      }

      if (status !== undefined) {
        filteredProducts = filteredProducts.filter(
          (product) => product.status === status
        );
      }

      // Phân trang
      const totalFilteredPages = Math.ceil(filteredProducts.length / limit);
      const paginatedProducts = filteredProducts.slice(
        (page - 1) * limit,
        page * limit
      );

      const user = req.user;
      res.render(PagePath.ADMIN_SHOP_PATH, {
        user,
        isLoggedIn: true,
        products: paginatedProducts,
        currentPage: page,
        limit,
        totalPages: totalFilteredPages,
        query,
        categories: categories,
        manufacturers: manufacturers,
        selectedSort: sort,
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
      const user = req.user;
      res.render(PagePath.ADMIN_SHOP_PATH, {
        user,
        isLoggedIn: true,
        products: [],
        currentPage: 1,
        limit,
        totalPages: 1,
        query: "",
        categories: [],
        manufacturers: [],
        selectedSort: sort,
        selectedFilters: {
          categories: [],
          manufacturers: [],
          minPrice: undefined,
          maxPrice: undefined,
          status: undefined,
        },
      });
    }
  }

  showAddProduct(req, res) {
    res.render(PagePath.ADD_PRODUCT_PATH);
  }

  showEditProduct(req, res) {
    res.render(PagePath.EDIT_PRODUCT_PATH);
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
}

export default new AdminController();
