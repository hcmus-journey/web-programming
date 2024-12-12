import { displayNotification } from "./Notification.js";

function changeImage(imagePath) {
  document.getElementById("mainImage").src = imagePath;
}

window.changeImage = changeImage;

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("addToCartForm");
  const quantityInput = document.getElementById("quantityInput");
  const quantityValue = document.getElementById("quantityValue");
  const decreaseBtn = document.getElementById("decreaseQuantity");
  const increaseBtn = document.getElementById("increaseQuantity");
  
  let quantity = 1;

  // Update quantity input field when "+" or "-" is clicked
  decreaseBtn.addEventListener("click", function() {
    if (quantity > 1) {
      quantity--;
      updateQuantity();
    }
  });

  increaseBtn.addEventListener("click", function() {
    quantity++;
    updateQuantity();
  });

  function updateQuantity() {
    quantityValue.innerText = quantity;
    quantityInput.value = quantity;
  }

  // Handle form submission via AJAX
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const productId = form.querySelector('input[name="productId"]').value;
    const quantity = parseInt(quantityInput.value, 10);

    addToCart(productId, quantity);
  });
});

// Add to cart function with AJAX
function addToCart(productId, quantity) {
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
