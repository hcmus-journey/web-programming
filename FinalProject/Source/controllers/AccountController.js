import PagePath from "../constants/PagePath.js";
import UserService from "../services/UserService.js";
import { User } from "../models/User.js";

class AccountController {
  constructor() {
    this.userService = new UserService(User);
    this.showAccountPage = this.showAccountPage.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  showAccountPage(req, res) {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    }
    const user = req.user;
    res.render(PagePath.ACCOUNT_PAGE_PATH, {
      user: user,
      isLoggedIn: true,
      successMessage: req.flash("success"),
      errorMessage: req.flash("error"),
    });
  }

  async updateProfile(req, res) {
    if (req.isAuthenticated()) {
      const userData = {
        name: req.body.name,
      };
      try {
        this.userService.updateUser(req.user.user_id, userData);
        res.json({ success: true, message: "Profile updated!" });
      } catch (error) {
        res.json({ success: false, message: error.message });
      }
    } else {
      res.redirect("/login");
    }
  }
}

export default new AccountController();