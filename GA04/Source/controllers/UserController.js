const PageURL = require("../public/js/constant/constants");

// Register
exports.showRegisterPage = (req, res) => {
  res.render(PageURL.REGISTER_PAGE_URL);
};

exports.registerUser = (req, res) => {
  const { username, password } = req.body;
  // Thêm logic để lưu thông tin người dùng vào database ở đây

  // Sau khi đăng ký thành công, chuyển hướng đến trang đăng nhập
  res.redirect("/user/login");
};

// Login
exports.showLoginPage = (req, res) => {
  res.render(PageURL.LOGIN_PAGE_URL);
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  // Thêm logic xử lý đăng nhập ở đây

  // Chuyển hướng đến bảng điều khiển nếu đăng nhập thành công
  res.redirect("/dashboard");
  // Nếu thông tin đăng nhập không hợp lệ, render lại trang login và thêm thông báo lỗi
};
