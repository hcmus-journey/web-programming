import PagePath from "../constants/PagePath.js";
import UserService from "../services/UserService.js";
import { User } from "../models/User.js";

class AdminController {
  constructor() {
    this.userService = new UserService(User);
    this.showPRofilePage = this.showProfilePage.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }
  async showProfilePage(req, res) {
    if (!req.isAuthenticated()) {
      res.redirect('/login');
      return;
    }
    const user = req.user;
    res.render(PagePath.ADMIN_PAGE_PATH, {
      user, 
      isLoggedIn: true,
      successMessage: req.flash('success'),
      errorMessage: req.flash('error'),
    });
  }
  
  async updateProfile(req, res) {
    if (req.isAuthenticated()) {
      const userData = {
        name: req.body.name,
      };
      try {
        this.userService.updateUser(
          req.user.user_id,
          userData
        );
      res.json({ success: true, message: "Profile updated!" });

      } catch (error) {
        res.json({ success: false, message: error.message });
      }
    } else {
      res.redirect('/');
    }
  }
}

export default  new AdminController();