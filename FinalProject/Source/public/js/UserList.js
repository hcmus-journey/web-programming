import { displayNotification } from "./Notification.js";

document.addEventListener("DOMContentLoaded", function () {
  
});

let user = null;

let index = null;

function openModal(button) {
  const modal = document.getElementById('modal');

  const action = document.getElementById('action-field');

  user = JSON.parse(button.getAttribute('data-user'));

  index = JSON.parse(button.getAttribute('data-index'));

  const name = document.getElementById('username-field');

  const statusId = 'status' + index;

  const userStatus = document.getElementById(statusId);

  console.log(statusId);

  console.log(userStatus.textContent);

  modal.classList.toggle("hidden");
  
  action.textContent = userStatus.textContent == 'ACTIVE' ? 'ban' : 'unban';

  name.textContent = user.name;
};

function closeModal() {
  const modal = document.getElementById('modal');

  modal.classList.toggle("hidden");
}

function action() {
  const modal = document.getElementById('modal');

  const statusId = 'status' + index;

  const userStatus = document.getElementById(statusId);

  const buttonId = 'change-status-btn' + index;

  const button = document.getElementById(buttonId);

  user.status = userStatus.textContent == 'ACTIVE' ? 'BANNED' : 'ACTIVE';

  const data = {
    id: user.user_id,
    status: user.status
  }

  console.log(user);

  fetch("/admin/users", {
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
        userStatus.textContent = user.status;

        button.textContent = user.status == 'ACTIVE' ? "Ban" : "Unban";

        displayNotification(data.message, "success"); // Show success notification
      } else {
        displayNotification(data.message, "error"); // Show error notification
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      displayNotification("An error occurred while editing profile.", "error");
    });

  modal.classList.toggle("hidden");
}

window.openModal = openModal;

window.closeModal = closeModal;

window.action = action;



