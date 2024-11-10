// controllers/userController.js
import { User } from "../models/User.js";
import bcrypt from 'bcryptjs';
import PagePath from "../constants/PagePath.js";

class UserController {
  async registerUser(req, res) {
    const { name, email, password, confirm } = req.body;
    if (password !== confirm) {
      return res.render(PagePath.REGISTER_PAGE_PATH, { error: 'Mật khẩu và xác nhận mật khẩu không khớp' });
    }

    try {
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        return res.render(PagePath.REGISTER_PAGE_PATH, { error: 'Email đã được đăng ký!' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const dateTimeNow = new Date();
      const newUser = new User({
        username: email,
        email: email,
        name: name,
        user_role: 'USER',
        status: 'ACTIVE',
        created_at: dateTimeNow,
        updated_at: dateTimeNow,
        password: hashedPassword,
      });

      await newUser.save();

      res.redirect("/login");
    } catch (error) {
      console.error(error);
      res.render(PagePath.REGISTER_PAGE_PATH, { error: 'Đã có lỗi xảy ra!' });
    }
  }
}

export default new UserController();