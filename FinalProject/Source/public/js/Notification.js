// Function to display the notification
export function displayNotification(message, type) {
  const notificationContainer = document.getElementById(
    "notification-container"
  );
  const notification = document.createElement("div");
  notification.classList.add(
    "p-4",
    "rounded-md",
    "text-white",
    "max-w-xs",
    "w-full"
  );

  if (type === "success") {
    notification.classList.add("bg-green-500");
  } else if (type === "error") {
    notification.classList.add("bg-red-500");
  }

  notification.innerText = message;
  notificationContainer.appendChild(notification);

  // Automatically remove notification after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}
