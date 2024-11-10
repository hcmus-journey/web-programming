import pagePath from "../constants/PagePath.js";

class MainController {
  static showHomePage(req, res) {
    res.render(pagePath.HOME_PAGE_PATH);
  }

  static showLoginPage(req, res) {
    res.render(pagePath.LOGIN_PAGE_PATH);
  }

  static showRegisterPage(req, res) {
    res.render(pagePath.REGISTER_PAGE_PATH);
  }

  static showProfilePage(req, res) {
    res.render(pagePath.PROFILE_PAGE_PATH);
  }

  static showProductPage(req, res) {
    res.render(pagePath.PRODUCT_PAGE_PATH);
  }

  static showCartPage(req, res) {
    res.render(pagePath.CART_PAGE_PATH);
  }

  static showCheckoutPage(req, res) {
    res.render(pagePath.CHECKOUT_PAGE_PATH);
  }

  static showAboutUsPage(req, res) {
    res.render(pagePath.ABOUT_US_PAGE_PATH);
  }

  static showContactPage(req, res) {
    res.render(pagePath.CONTACT_PAGE_PATH);
  }

  static showShopPage(req, res) {
    res.render(pagePath.SHOP_PAGE_PATH);
  }

  static showAccountPage(req, res) {
    res.render(pagePath.ACCOUNT_PAGE_PATH);
  }

  static showPrivacyPage(req, res) {
    res.render(pagePath.PRIVACY_PAGE_PATH);
  }
}

export default MainController;