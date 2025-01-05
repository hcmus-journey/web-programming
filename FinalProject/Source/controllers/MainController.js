import pagePath from "../constants/PagePath.js";
import ProductService from "../services/ProductService.js";
import UserService from "../services/UserService.js";
import { User } from "../models/User.js";
import ejs from "ejs";



class MainController {
  constructor() {
    this.userService = new UserService(User);

    this.showHomePage = this.showHomePage.bind(this);
    this.showAboutUsPage = this.showAboutUsPage.bind(this);
    this.showContactPage = this.showContactPage.bind(this);
    this.showPrivacyPage = this.showPrivacyPage.bind(this);
  }

  async showHomePage(req, res) {
    let isLoggedIn = true;
    if (!req.isAuthenticated()) {
      isLoggedIn = false;
    }
    try {
      const topNewArrivals = await ProductService.getTopNewArrivals();
      const recommendedProducts = await ProductService.getRecommendedProducts();

      res.render(pagePath.HOME_PAGE_PATH ,{
        user: req.user,
        topNewArrivals, 
        recommendedProducts,
        isLoggedIn: isLoggedIn
      });
    } catch (error) {
      console.error("Error fetching product:", error);
    }

  }

  async showAboutUsPage(req, res) {
    let isLoggedIn = true;
    if (!req.isAuthenticated()) {
      isLoggedIn = false;
    }
    res.render(pagePath.ABOUT_US_PAGE_PATH, {isLoggedIn: isLoggedIn});
  }

  async showContactPage(req, res) {
    let isLoggedIn = true;
    if (!req.isAuthenticated()) {
      isLoggedIn = false;
    }
    res.render(pagePath.CONTACT_PAGE_PATH, {isLoggedIn: isLoggedIn});
  }

  async showPrivacyPage(req, res) {
    let isLoggedIn = true;
    if (!req.isAuthenticated()) {
      isLoggedIn = false;
    }
    res.render(pagePath.PRIVACY_PAGE_PATH, {isLoggedIn: isLoggedIn});
  }
}

export default  new MainController();