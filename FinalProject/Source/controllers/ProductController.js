// controllers/ProductController.js
import ProductService from "../services/ProductService.js";
import PagePath from "../constants/PagePath.js";

class ProductController {
  async showProductPage(req, res) {
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

      res.render(PagePath.PRODUCT_PAGE_PATH, {
        product,
        relatedProducts,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }
}

export default new ProductController();
