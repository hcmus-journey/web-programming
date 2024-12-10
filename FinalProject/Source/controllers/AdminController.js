import pagePath from "../constants/PagePath.js";
import ProductService from "../services/ProductService.js";

class AdminController {
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

      res.render(pagePath.ADMIN_SHOP_PATH, {
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
      res.render(pagePath.ADMIN_SHOP_PATH, {
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
    res.render(pagePath.ADD_PRODUCT_PATH);
  }

  showEditProduct(req, res) {
    res.render(pagePath.EDIT_PRODUCT_PATH);
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
        return res.render(pagePath.NOT_FOUND_PAGE_PATH);
      }

      res.render(pagePath.ADMIN_PRODUCT_PATH, {
        product,
        relatedProducts,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }
}

export default new AdminController();
