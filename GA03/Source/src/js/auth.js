// Global variables to store user data
let registeredUsername = "";
let registeredPassword = "";

// Register user function
function registerUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const agreement = document.getElementById("agreement").checked;

  // Simple validation
  if (!name || !email || !password || !confirm) {
    alert("Please fill all fields.");
    return;
  }
  if (password !== confirm) {
    alert("Passwords do not match.");
    return;
  }
  if (!agreement) {
    alert("Please agree to the terms and conditions.");
    return;
  }

  // Save the data in global variables and localStorage
  registeredUsername = email;
  registeredPassword = password;
  localStorage.setItem("registeredEmail", registeredUsername);
  localStorage.setItem("registeredPassword", registeredPassword);

  alert("Account registered successfully!");

  // Navigate to login page
  window.location.href = "login.html";
}

// Login user function
function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Get the stored email and password from localStorage
  const registeredEmail = localStorage.getItem("registeredEmail");
  const registeredPassword = localStorage.getItem("registeredPassword");

  // Check if the input matches the registered data
  if (email === registeredEmail && password === registeredPassword) {
    alert("Đăng nhập thành công!");
    window.location.href = "../index.html"; // Redirect to homepage
  } else {
    alert("Email hoặc mật khẩu không chính xác!");
  }
}
