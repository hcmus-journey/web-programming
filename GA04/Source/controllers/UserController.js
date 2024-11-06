    // Hiển thị trang đăng ký
    exports.showRegisterPage = (req, res) => {
        res.render('user/register'); // Render trang register.ejs
    };
  
  // Xử lý đăng ký người dùng
  exports.registerUser = (req, res) => {
    const { username, password } = req.body;
    // Thêm logic để lưu thông tin người dùng vào database ở đây
    res.redirect('user/login');
  };
  
  // Hiển thị trang đăng nhập
  exports.showLoginPage = (req, res) => {
    res.render('user/login'); // Render trang login.ejs
  };
  
  // Xử lý đăng nhập người dùng
  exports.loginUser = (req, res) => {
    const { username, password } = req.body;

    res.redirect('/dashboard');
    // Nếu thông tin sai, có thể render lại trang login với thông báo lỗi
  };
  