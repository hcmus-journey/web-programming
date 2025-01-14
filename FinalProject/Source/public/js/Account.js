import { displayNotification } from "./Notification.js";

document.addEventListener("DOMContentLoaded", function () {
  const openProfile = document.getElementById("edit-btn");
  const closeProfile = document.getElementById("cancel-btn")
  const profile = document.getElementById("profile");
  const editProfile = document.getElementById("edit-profile");
  const fileButton = document.getElementById("file-btn");
  const file = document.getElementById("avatar");


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

  file.addEventListener("change", function () {
    fileButton.innerText = file.files[0].name;
  });
});

async function edit() {
  const userName = document.getElementById('userName');
  const name = userName.value;
  const profile = document.getElementById("profile");
  const editProfile = document.getElementById("edit-profile");
  const avatar = document.getElementById("avatar");

  const file = avatar.files[0];

  const formData = new FormData();
  formData.append('name', name); // Append the name field

  formData.append('image', file); // Append the file field, if provided

  const role = profile.getAttribute("data-role");

  const url = role == 'admin' ? "/admin/account" : "/account";

  fetch(url, {
    method: "PUT",
    body: formData,
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

        let avatarFields = document.querySelectorAll(".avatar")

        for (let field of avatarFields) {
          field.setAttribute("src", data.fileUrl);
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
