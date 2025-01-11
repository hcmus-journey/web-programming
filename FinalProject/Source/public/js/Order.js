import HATShopInfo from "../../constants/HATShopInfo.js"; 

export async function placeOrder()  {
  const full_name = document.getElementById("full-name").value;
  const phone = document.getElementById("phone").value;
  const shipping_address = document.getElementById("address").value + ", " + 
                          document.getElementById("city").value + ", " + 
                          document.getElementById("region").value;

  const subtotal = parseFloat(document.getElementById("subtotal")
                                      .innerText
                                      .replace("$", ""));
  const shippingFee = parseFloat(document.getElementById("shipping-fee")
                                         .innerText
                                         .replace("$", "") || 0);

  const payment_method = "COD";

  if (!full_name || !phone || !shipping_address) {
    alert("Please fill all fields.");
    return;
  }

  const data = {
    full_name,
    phone,
    shipping_address,
    subtotal,
    shippingFee,
    payment_method
  }

  try {
    const response = await fetch(`/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      setTimeout(() => {
        window.location.href = `/orders/${result.order_id}`; // Redirect to homepage
      }, 500);
    } else {
      alert("Order failed. Please try again.");
    }

  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again later.");
  }

}
    
window.placeOrder = placeOrder;
    