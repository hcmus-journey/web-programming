import { displayNotification } from "./Notification.js";

document.addEventListener("DOMContentLoaded", function () {
  const openProfile = document.getElementById("edit-btn");
  const closeProfile = document.getElementById("cancel-btn")
  const profile = document.getElementById("profile");
  const editProfile = document.getElementById("edit-profile");

  // Toggle categories filter
  openProfile.addEventListener("click", function () {
    const userName = document.getElementById('userName');
    profile.classList.toggle("hidden");
    editProfile.classList.toggle("hidden");
    userName.focus();
    userName.setSelectionRange(userName.value.length, userName.value.length);
  });

  closeProfile.addEventListener("click", function () {
    profile.classList.toggle("hidden");
    editProfile.classList.toggle("hidden");
  });
});

function edit() {
  const userName = document.getElementById('userName');
  const name = userName.value;
  const data = { name };
  const profile = document.getElementById("profile");
  const editProfile = document.getElementById("edit-profile");

  fetch("/dashboard", {
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
      profile.classList.toggle("hidden");
      editProfile.classList.toggle("hidden");
      if (data.success) {
        let nameFields = document.querySelectorAll(".name")

        for (let field of nameFields) {
          field.textContent = name;
        }

        displayNotification(data.message, "success"); // Show success notification
      } else {
        displayNotification(data.message, "error"); // Show error notification
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      displayNotification("An error occurred while editing profile.", "error");
    });
};

window.edit = edit;
