// controllers/userController.js
import { User } from "../models/User.js";
import bcrypt from 'bcryptjs';
import PagePath from "../constants/PagePath.js";
import UserService from "../services/UserService.js";

class UserController {
  constructor() {
    this.userService = new UserService(User); // Pass the User model to UserService
    this.registerUser = this.registerUser.bind(this);
    this.showLoginPage = this.showLoginPage.bind(this);
    this.showRegisterPage = this.showRegisterPage.bind(this);
  }

  async registerUser(req, res) {
    const { name, email, password, confirm } = req.body;
    if (password !== confirm) {
      return res.render(PagePath.REGISTER_PAGE_PATH, { error: 'Mật khẩu và xác nhận mật khẩu không khớp' });
    }

    try {
      const existingUser = await this.userService.getUserByEmail(email);
      if (existingUser) {
        return res.render(PagePath.REGISTER_PAGE_PATH, { error: 'Email đã được đăng ký!' });
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
      res.render(PagePath.REGISTER_PAGE_PATH, { error: 'Đã có lỗi xảy ra!' });
    }
  }

  showLoginPage(req, res) {
    res.render(PagePath.LOGIN_PAGE_PATH);
  }

  showRegisterPage(req, res) {
    res.render(PagePath.REGISTER_PAGE_PATH);
  }
}

export default new UserController();
