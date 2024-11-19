// controllers/ShopController.js
import ProductService from "../services/ProductService.js";
import PagePath from "../constants/PagePath.js";

class ShopController {
  async showShopPage(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const query = req.query.query || ""; // Lấy từ khóa tìm kiếm

    try {
      if (query == "") {
        const totalProducts = await ProductService.countProducts(); // Đếm toàn bộ sản phẩm
        const products = await ProductService.getProductsPaginated(page, limit); // Lấy sản phẩm theo trang
        const totalPages = Math.ceil(totalProducts / limit); // Tính tổng số trang
        res.render(PagePath.SHOP_PAGE_PATH, {
          products,
          currentPage: page,
          limit,
          totalPages,
          query: "", // Gửi query rỗng
        });
      } else {
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
      }
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
