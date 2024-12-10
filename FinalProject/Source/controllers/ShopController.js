// controllers/ShopController.js
import ProductService from "../services/ProductService.js";
import PagePath from "../constants/PagePath.js";
import ejs from "ejs";

class ShopController {
  async showShopPage(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const query = req.query.query || "";
    const brandVal = req.query.manufacturers ? req.query.manufacturers.split(",") : [];
    const catVal = req.query.categories ? req.query.categories.split(",") : [];
    const sort = req.query.sort || "";
    const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : undefined;
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined;
    const status = req.query.status || undefined;
  
    try {
      const products = await ProductService.searchProducts(query, sort);
      const filteredProducts = products
        .filter(product => (catVal.length === 0 || catVal.includes(product.category_id.toString())))
        .filter(product => (brandVal.length === 0 || brandVal.includes(product.manufacturer_id.toString())))
        .filter(product => (isNaN(minPrice) || product.price >= minPrice))
        .filter(product => (isNaN(maxPrice) || product.price <= maxPrice))
        .filter(product => (!status || product.status === status));
  
      const totalFilteredPages = Math.ceil(filteredProducts.length / limit);
      const paginatedProducts = filteredProducts.slice((page - 1) * limit, page * limit);
  
      if (Object.keys(req.query).length !== 0) {
        const html = await ejs.renderFile("views/layouts/productList.ejs", { productList: paginatedProducts });
        const pagination = await ejs.renderFile("views/layouts/pagination.ejs", { totalPages: totalFilteredPages, currentPage: page });
        return res.json({ html, pagination });
      }

      res.render(PagePath.SHOP_PAGE_PATH, {
        products: paginatedProducts,
        totalPages: totalFilteredPages,
        currentPage: page,
        selectedSort: sort,
        categories: [],
        manufacturers: [],
        isLoggedIn: req.isAuthenticated(),
        selectedFilters: { categories: catVal, manufacturers: brandVal, minPrice, maxPrice, status },
      });

    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Error loading products");
    }
  }
}

export default new ShopController();
