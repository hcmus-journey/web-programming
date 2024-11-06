// Global variable to store user data temporarily (no real database)
const users = {};

// Register
exports.showRegisterPage = (req, res) => {
  res.render("user/register");
};

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Logic lưu người dùng vào database
    const newUser = new users({ username, password });
    await newUser.save();

    // Redirect sau khi đăng ký thành công
    res.redirect("user/login"); // Chuyển hướng đến trang login
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during registration.");
  }
};

// Login
exports.showLoginPage = (req, res) => {
  res.render("user/login");
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the global users object
    const user = users[username];

    if (!user) {
      return res.status(400).send("User not found.");
    }

    // Check if the entered password matches
    if (password === user.password) {
      res.redirect("/dashboard"); // Redirect to dashboard if login is successful
    } else {
      res.status(400).send("Invalid password.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during login.");
  }
};
