import PagePath from "../constants/PagePath.js";

class AdminController {
    showAdminPage(req, res) {
      if (req.isAuthenticated()) {
        res.render(PagePath.ADMIN_PAGE_PATH), {isLoggedIn: true};
      }
      else {
        res.redirect('/login');
      }
    }   
}

export default  new AdminController();