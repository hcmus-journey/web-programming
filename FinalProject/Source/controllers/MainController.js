import pagePath from "../constants/PagePath.js";
import ProductService from "../services/ProductService.js";

class MainController {
  async showHomePage(req, res) {
    try {
      const topNewArrivals = await ProductService.getTopNewArrivals();
      const recommendedProducts = await ProductService.getRecommendedProducts();

      res.render(pagePath.HOME_PAGE_PATH ,{
        topNewArrivals, recommendedProducts,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
    }

  }

  showProfilePage(req, res) {
    res.render(pagePath.PROFILE_PAGE_PATH);
  }

  showProductPage(req, res) {
    res.render(pagePath.PRODUCT_PAGE_PATH);
  }

  showCartPage(req, res) {
    res.render(pagePath.CART_PAGE_PATH);
  }

  showCheckoutPage(req, res) {
    res.render(pagePath.CHECKOUT_PAGE_PATH);
  }

  showAboutUsPage(req, res) {
    res.render(pagePath.ABOUT_US_PAGE_PATH);
  }

  showContactPage(req, res) {
    res.render(pagePath.CONTACT_PAGE_PATH);
  }

  showShopPage(req, res) {
    res.render(pagePath.SHOP_PAGE_PATH);
  }

  showAccountPage(req, res) {
    res.render(pagePath.ACCOUNT_PAGE_PATH);
  }

  showPrivacyPage(req, res) {
    res.render(pagePath.PRIVACY_PAGE_PATH);
  }
}

export default  new MainController();