import pagePath from "../constants/PagePath.js";
import ProductService from "../services/ProductService.js";

class MainController {
  async showHomePage(req, res) {
    let isLoggedIn = true;
    if (!req.isAuthenticated()) {
      isLoggedIn = false;
    }
    try {
      const topNewArrivals = await ProductService.getTopNewArrivals();
      const recommendedProducts = await ProductService.getRecommendedProducts();

      res.render(pagePath.HOME_PAGE_PATH ,{
        topNewArrivals, 
        recommendedProducts,
        isLoggedIn: isLoggedIn
      });
    } catch (error) {
      console.error("Error fetching product:", error);
    }

  }

  showProductPage(req, res) {
    let isLoggedIn = true;
    if (!req.isAuthenticated()) {
      isLoggedIn = false;
    }
    res.render(pagePath.PRODUCT_PAGE_PATH, {isLoggedIn: isLoggedIn});
  }

  showAboutUsPage(req, res) {
    let isLoggedIn = true;
    if (!req.isAuthenticated()) {
      isLoggedIn = false;
    }
    res.render(pagePath.ABOUT_US_PAGE_PATH, {isLoggedIn: isLoggedIn});
  }

  showContactPage(req, res) {
    let isLoggedIn = true;
    if (!req.isAuthenticated()) {
      isLoggedIn = false;
    }
    res.render(pagePath.CONTACT_PAGE_PATH, {isLoggedIn: isLoggedIn});
  }

  showShopPage(req, res) {
    let isLoggedIn = true;
    if (!req.isAuthenticated()) {
      isLoggedIn = false;
    }
    res.render(pagePath.SHOP_PAGE_PATH, {isLoggedIn: isLoggedIn});
  }

  showPrivacyPage(req, res) {
    let isLoggedIn = true;
    if (!req.isAuthenticated()) {
      isLoggedIn = false;
    }
    res.render(pagePath.PRIVACY_PAGE_PATH, {isLoggedIn: isLoggedIn});
  }
}

export default  new MainController();