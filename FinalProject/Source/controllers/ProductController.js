// controllers/ProductController.js
import ProductService from "../services/ProductService.js";
import PagePath from "../constants/PagePath.js";

class ProductController {
  async showProductPage(req, res) {
    const productId = req.query.id;
    let isLoggedIn = true;
    if (!req.isAuthenticated()) {
      isLoggedIn = false;
    }
    try {
      const product = await ProductService.getProductById(productId);
      const relatedProducts = await ProductService.getRelatedProducts(productId);
      if (!product) {
        console.error("Product not found");
        return res.render(PagePath.NOT_FOUND_PAGE_PATH, {
          isLoggedIn: isLoggedIn,
          successMessage: req.flash('success'),
          errorMessage: req.flash('error'),});
      }
      res.render(PagePath.PRODUCT_PAGE_PATH, {
        product, 
        relatedProducts,
        isLoggedIn: isLoggedIn,
        successMessage: req.flash('success'),
        errorMessage: req.flash('error'),
      });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }
}

export default new ProductController();
