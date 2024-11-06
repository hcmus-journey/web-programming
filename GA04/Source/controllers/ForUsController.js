const PageURL = require("../public/js/constant/constants");

// About Us
exports.showAboutUs = (req, res) => {
  res.render(PageURL.ABOUT_US_PAGE_URL);
};

// Contact Us
exports.showContactUs = (req, res) => {
  res.render(PageURL.CONTACT_PAGE_URL);
};
