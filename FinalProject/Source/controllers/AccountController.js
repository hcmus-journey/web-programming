import PagePath from "../constants/PagePath.js";

class AccountController {
    showProfilePage(req, res) {
      if (req.isAuthenticated()) {
        res.render(PagePath.PROFILE_PAGE_PATH), {isLoggedIn: true};
      }
      else {
        res.redirect('/login');
      }
    }

    showAccountPage(req, res) {
      if (req.isAuthenticated()) {
        res.render(PagePath.ACCOUNT_PAGE_PATH, {isLoggedIn: true});
      }
      else {
        res.redirect('/login');
      }
    }      
}

export default  new AccountController();