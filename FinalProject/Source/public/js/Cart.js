import HATShopInfo from "../../constants/HATShopInfo.js"; 

export function updateQuantity(productId, action, stock) {
  const quantityDisplay = document.getElementById(`quantity_${productId}`);
  const productTotalDisplay = document.getElementById(
    `product-total_${productId}`
  );
  const subtotalDisplay = document.getElementById("cart-subtotal");
  const shippingFeeDisplay = document.getElementById("shipping-fee");
  const totalPriceDisplay = document.getElementById("total-price");

  if (
    !quantityDisplay ||
    !productTotalDisplay ||
    !subtotalDisplay ||
    !shippingFeeDisplay ||
    !totalPriceDisplay
  ) {
    console.error("Elements not found for productId:", productId);
    return;
  }

  let currentQuantity = parseInt(quantityDisplay.innerText);
  let productTotal = parseFloat(productTotalDisplay.innerText.replace("$", ""));
  let subtotal = parseFloat(subtotalDisplay.innerText.replace("$", ""));
  let shippingFee = parseFloat(shippingFeeDisplay.innerText.replace("$", "") || 0);
  let totalPrice = parseFloat(totalPriceDisplay.innerText.replace("$", ""));

  if (action === "increase" && currentQuantity < stock) {
    currentQuantity++;
  } else if (action === "decrease" && currentQuantity > 1) {
    currentQuantity--;
  } else {
    return;
  }

  const data = { product_id: productId, quantity: currentQuantity };

  fetch(`/cart`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        quantityDisplay.innerText = currentQuantity;

        const updatedProductTotal = parseFloat(data.updatedProductTotal);
        productTotalDisplay.innerText = `$${updatedProductTotal.toFixed(2)}`;

        subtotal -= productTotal;
        subtotal += updatedProductTotal;
        subtotalDisplay.innerText = `$${subtotal.toFixed(2)}`;

        // Update shipping fee based on the new subtotal
        const FREE_SHIPPING_THRESHOLD = HATShopInfo.FREE_SHIPPING_THRESHOLD;
        const SHIPPING_FEE = HATShopInfo.SHIPPING_FEE;

        if (subtotal >= FREE_SHIPPING_THRESHOLD) {
          shippingFeeDisplay.innerHTML = `
            <span class="text-gray-400 line-through">$${SHIPPING_FEE.toFixed(2)}</span>
            <span class="text-primary font-semibold">$0</span>`;
          shippingFee = 0;
        } else {
          shippingFeeDisplay.innerHTML = `
            <span class="text-primary font-semibold">$${SHIPPING_FEE.toFixed(2)}</span>`;
          shippingFee = SHIPPING_FEE;
        }

        totalPrice = subtotal + shippingFee;
        totalPriceDisplay.innerText = `$${totalPrice.toFixed(2)}`;
      } else {
        console.error("Error updating cart:", data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function removeProduct(productId) {
  const productRow = document.getElementById(`product_${productId}`);
  const subtotalDisplay = document.getElementById("cart-subtotal");
  const shippingFeeDisplay = document.getElementById("shipping-fee");
  const totalPriceDisplay = document.getElementById("total-price");
  const productTotalDisplay = document.getElementById(
    `product-total_${productId}`
  );

  if (!productRow || !subtotalDisplay || !shippingFeeDisplay || !totalPriceDisplay || !productTotalDisplay) {
    console.error("Elements not found for productId:", productId);
    return;
  }

  let productTotal = parseFloat(productTotalDisplay.innerText.replace("$", ""));
  let subtotal = parseFloat(subtotalDisplay.innerText.replace("$", ""));
  let shippingFee = parseFloat(shippingFeeDisplay.innerText.replace("$", "") || 0);
  let totalPrice = parseFloat(totalPriceDisplay.innerText.replace("$", ""));

  fetch(`/cart/${productId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        subtotal -= productTotal;
        subtotalDisplay.innerText = `$${subtotal.toFixed(2)}`;

        // If subtotal is 0, set shipping fee to 0
        if (subtotal === 0) {
          shippingFeeDisplay.innerHTML = `
            <span class="text-primary font-semibold">$0</span>`;
          shippingFee = 0;
        } else {
          // Update shipping fee based on the new subtotal
          const FREE_SHIPPING_THRESHOLD = HATShopInfo.FREE_SHIPPING_THRESHOLD;
          const SHIPPING_FEE = HATShopInfo.SHIPPING_FEE;

          if (subtotal >= FREE_SHIPPING_THRESHOLD) {
            shippingFeeDisplay.innerHTML = `
              <span class="text-gray-400 line-through">$${SHIPPING_FEE.toFixed(2)}</span>
              <span class="text-primary font-semibold">$0</span>`;
            shippingFee = 0;
          } else {
            shippingFeeDisplay.innerHTML = `
              <span class="text-primary font-semibold">$${SHIPPING_FEE.toFixed(2)}</span>`;
            shippingFee = SHIPPING_FEE;
          }
        }

        totalPrice = subtotal + shippingFee;
        totalPriceDisplay.innerText = `$${totalPrice.toFixed(2)}`;

        productRow.remove();
      } else {
        console.error("Error removing product from cart:", data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

window.updateQuantity = updateQuantity;
window.removeProduct = removeProduct;