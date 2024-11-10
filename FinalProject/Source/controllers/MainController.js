const pagePath = require("../constants/PagePath");

exports.showHomePage = (req, res) => {
    res.render(pagePath.HOME_PAGE_PATH);
};

exports.showLoginPage = (req, res) => {
    res.render(pagePath.LOGIN_PAGE_PATH);
};

exports.showRegisterPage = (req, res) => {
    res.render(pagePath.REGISTER_PAGE_PATH);
};

exports.showProfilePage = (req, res) => {
    res.render(pagePath.PROFILE_PAGE_PATH);
};

exports.showProductPage = (req, res) => {
  res.render(pagePath.PRODUCT_PAGE_PATH);
};

exports.showCartPage = (req, res) => {
  res.render(pagePath.CART_PAGE_PATH);
};

exports.showCheckoutPage = (req, res) => {
  res.render(pagePath.CHECKOUT_PAGE_PATH);
};

exports.showAboutUsPage = (req, res) => {
  res.render(pagePath.ABOUT_US_PAGE_PATH);
};

exports.showContactPage = (req, res) => {
  res.render(pagePath.CONTACT_PAGE_PATH);
};

exports.showShopPage = (req, res) => {
  res.render(pagePath.SHOP_PAGE_PATH);
};

exports.showAccountPage = (req, res) => {
  res.render(pagePath.ACCOUNT_PAGE_PATH);
};

exports.showPrivacyPage = (req, res) => {
  res.render(pagePath.PRIVACY_PAGE_PATH);
};
