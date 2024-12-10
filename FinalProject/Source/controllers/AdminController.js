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
        user_role: 'USER',
        status: 'ACTIVE',
        created_at: new Date(),
        updated_at: new Date(),
        password: hashedPassword,
      };
      try {
        const updatedProfile = await this.userService.updateUser(
          req.user.user_id,
          
        );

        res.json({ success: true, updatedProductTotal: updatedProductTotal });
      } catch (error) {
        res.json({ success: false, message: error.message });
      }
    } else {
      return res.json({
        success: false,
        message: "Please log in to update products on your cart.",
      });
    }
  }
}

export default  new AdminController();