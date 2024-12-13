import { displayNotification } from "./Notification.js";

function change() {
    const current = document.getElementById('current').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;
    const data = { current, password, confirm };
  
    fetch("/change-password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to edit profile");
        }
        return response.json(); // Only parse JSON if the response is successful
      })
      .then((data) => {
        if (data.success) {
            window.location.href = "/logout";
        }
        else {
          displayNotification(data.message, "error"); // Show error notification
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        displayNotification("An error occurred while changing password.", "error");
      });
  };
  
  window.change = change;
  