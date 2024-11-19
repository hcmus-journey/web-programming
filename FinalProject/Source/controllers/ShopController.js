// controllers/ShopController.js
import ProductService from "../services/ProductService.js";
import PagePath from "../constants/PagePath.js";

class ShopController {
  async showShopPage(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const query = req.query.query || ""; // Lấy từ khóa tìm kiếm

    try {
      // Tìm kiếm theo tên sản phẩm
      const { products, total, totalPages } =
      await ProductService.searchProducts(query, page, limit);
      res.render(PagePath.SHOP_PAGE_PATH, {
      products,
      currentPage: page,
      limit,
      totalPages,
      query,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.render(PagePath.SHOP_PAGE_PATH, {
        products: [],
        currentPage: 1,
        limit,
        totalPages: 1,
        query: "",
      });
    }
  }
}

export default new ShopController();
