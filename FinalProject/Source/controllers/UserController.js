// controllers/userController.js
import { User } from "../models/User.js";
import bcrypt from 'bcryptjs';
import PagePath from "../constants/PagePath.js";
import UserService from "../services/UserService.js";
import passport from 'passport';

class UserController {
  constructor() {
    this.userService = new UserService(User); // Pass the User model to UserService
    this.registerUser = this.registerUser.bind(this);
    this.showLoginPage = this.showLoginPage.bind(this);
    this.showRegisterPage = this.showRegisterPage.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  async registerUser(req, res) {
    const { name, email, password, confirm } = req.body;
    if (password !== confirm) {
      return res.render(PagePath.REGISTER_PAGE_PATH, { error: 'Mật khẩu và xác nhận mật khẩu không khớp', isLoggedIn: false });
    }

    try {
      const existingUser = await this.userService.getUserByEmail(email);
      if (existingUser) {
        return res.render(PagePath.REGISTER_PAGE_PATH, { error: 'Email đã được đăng ký!', isLoggedIn: false });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        username: email,
        email: email,
        name: name,
        user_role: 'USER',
        status: 'ACTIVE',
        created_at: new Date(),
        updated_at: new Date(),
        password: hashedPassword,
      };

      await this.userService.createUser(newUser);

      res.redirect("/login");
    } catch (error) {
      console.error(error);
      res.render(PagePath.REGISTER_PAGE_PATH, { error: 'Đã có lỗi xảy ra!', isLoggedIn: false });
    }
  }

  async loginUser(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.render(PagePath.LOGIN_PAGE_PATH, { error: 'Đã xảy ra lỗi, xin thử lại!', isLoggedIn: false});
      }
  
      if (!user) {
        return res.render(PagePath.LOGIN_PAGE_PATH, { error: info.message, isLoggedIn: false });
      }
  
      // Log in the user
      req.logIn(user, (err) => {
        if (err) {
          return res.render(PagePath.LOGIN_PAGE_PATH, { error: 'Đã xảy ra lỗi, xin thử lại!', isLoggedIn: false });
        }
        
        if (req.body.remember) {
          req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
        } else {
          req.session.cookie.expires = false; // Session expires at browser close
        }
  
        res.redirect("/");

      });
    })(req, res, next);
  }

  async logoutUser(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  }

  async changePassword(req, res, next) {
    if(!req.isAuthenticated()) {
      res.render(PagePath.LOGIN_PAGE_PATH, {isLoggedIn: false});
    }
    else {
      const { current, password, confirm } = req.body;

      const isMatch = await bcrypt.compare(current, req.user.password);
      if (!isMatch) {
        return res.json({ success: false, message: "Wrong current password!" });
      }

      if (password !== confirm) {
        return res.json({ success: false, message: "New password and confirm password do not match!" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = {
        password: hashedPassword
      };
      try {
        await this.userService.updateUser(
          req.user.user_id,
          userData
        );

        res.json({ success: true, message: "Password updated!" });
      } catch (error) {
        res.json({ success: false, message: error.message });
      }

    }
  }

  showLoginPage(req, res) {
    if (!req.isAuthenticated()) {
      res.render(PagePath.LOGIN_PAGE_PATH, {isLoggedIn: false});
    }
    else {
      res.redirect('/');
    }
  }

  showRegisterPage(req, res) {
    if (!req.isAuthenticated()) {
      res.render(PagePath.REGISTER_PAGE_PATH, {isLoggedIn: false});
    }
    else {
      res.redirect('/');
    }
  }

  showChangePasswordPage(req, res) {
    if (req.isAuthenticated()) {
      res.render(PagePath.CHANGE_PASSWORD_PAGE_PATH, {isLoggedIn: true})
    }
    else {
      res.redirect('/login');
    }
  }
}

export default new UserController();
