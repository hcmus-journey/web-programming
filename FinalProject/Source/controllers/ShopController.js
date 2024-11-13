// controllers/ShopController.js
import ProductService from "../services/ProductService.js";
import PagePath from "../constants/PagePath.js";

class ShopController {
  async showShopPage(req, res) {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = 9;

    try {
      // Fetch total products and paginated products
      const totalProducts = await ProductService.countProducts();
      const totalPages = Math.ceil(totalProducts / limit);
      const products = await ProductService.getProductsPaginated(page, limit);

      // Render the shop page with products and pagination data
      res.render(PagePath.SHOP_PAGE_PATH, {
        products,
        currentPage: page,
        limit,
        totalPages,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.render(PagePath.SHOP_PAGE_PATH, { error: 'An error occurred while fetching products.' });
    }
  }
}

export default new ShopController();
