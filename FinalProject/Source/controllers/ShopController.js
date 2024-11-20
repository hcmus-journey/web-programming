// controllers/ShopController.js
import ProductService from "../services/ProductService.js";
import PagePath from "../constants/PagePath.js";

class ShopController {
  async showShopPage(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const query = req.query.query || ""; // Lấy từ khóa tìm kiếm
    const brandVal = req.query.brandVal || "";
    const catVal = req.query.catVal || "";
    const sort = req.query.sort || ""; // Lấy giá trị sort
    const minPrice = req.query.min || undefined;
    const maxPrice = req.query.max || undefined;
    const status = req.query.status || undefined;

    try {
      // Lọc theo Category & Manufacturer
      const categories = await ProductService.getAllCategories(); // Lấy toàn bộ Category
      const manufacturers = await ProductService.getAllManufacturer(); // Lấy toàn bộ Manufacturer

      const filteredCategories = catVal
        ? await ProductService.filterByCategory(catVal)
        : categories;

      const filteredManufacturers = brandVal
        ? await ProductService.filterByManufacturer(brandVal)
        : manufacturers;

      // Lấy danh sách sản phẩm dựa trên bộ lọc
      const filteredProducts = await ProductService.filterByPriceAndStatus(
        minPrice,
        maxPrice,
        status
      );

      // Tìm kiếm theo tên sản phẩm
      const { products, total, totalPages } =
        await ProductService.searchProducts(query, page, limit);
      res.render(PagePath.SHOP_PAGE_PATH, {
        products: filteredProducts,
        currentPage: page,
        limit,
        totalPages,
        query,
        categories: filteredCategories,
        manufacturers: filteredManufacturers,
        sort,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.render(PagePath.SHOP_PAGE_PATH, {
        products: [],
        currentPage: 1,
        limit,
        totalPages: 1,
        query: "",
        categories: [],
        manufacturers: [],
        sort,
      });
    }
  }
}

export default new ShopController();
