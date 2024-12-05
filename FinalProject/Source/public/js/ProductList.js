import { displayNotification } from "./Notification.js";

export function addToCart(productId, quantity = 1) {
  const data = { productId, quantity };

  fetch("/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }
      return response.json(); // Only parse JSON if the response is successful
    })
    .then((data) => {
      if (data.success) {
        displayNotification(data.message, "success"); // Show success notification
      } else {
        displayNotification(data.message, "error"); // Show error notification
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      displayNotification("An error occurred while adding the product to the cart.", "error");
    });
}

// Make the function globally available
window.addToCart = addToCart;  // Make it globally accessible
