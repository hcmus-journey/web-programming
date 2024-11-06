const PageURL = require("../public/js/constant/constants");

exports.showHomePage = (req, res) => {
  res.render("home_page", {
    ABOUT_US_PAGE_URL: PageURL.ABOUT_US_PAGE_URL,
    CONTACT_PAGE_URL: PageURL.CONTACT_PAGE_URL,
  });
};
