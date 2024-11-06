async function registerUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const agreement = document.getElementById("agreement").checked;

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

  try {
    const response = await fetch("/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password: password }),
    });

    if (response.ok) {
      alert("Account registered successfully!");
      setTimeout(() => {
        window.location.href = "/user/login"; // Redirect to login page
      }, 3500);
    } else {
      alert("Registration failed. Please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again later.");
  }
}

async function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Send login data to server
  const response = await fetch("/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: email, password: password }),
  });

  if (response.ok) {
    alert("Đăng nhập thành công!");
    window.location.href = "/"; // Redirect to homepage
  } else {
    alert("Email hoặc mật khẩu không chính xác!");
  }
}
