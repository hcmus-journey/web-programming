import { displayNotification } from "./Notification.js";

document.addEventListener("DOMContentLoaded", function() {
  const sortSelect = document.getElementById("sort");
  const paginationContainer = document.querySelector(".pagination-controls");

  let currentPage = 1; // Track the current page
    
    const getCurrentSort = () => {
      const sort = sortSelect.value;
      return {
        sort,
      };
    };

    const fetchOrders = (filters, page = 1) => {
      currentPage = page; // Update the current page
      const params = new URLSearchParams({ ...filters, page });
      const url = `/orders?${params.toString()}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("orderList").innerHTML = data.html;
          paginationContainer.innerHTML = data.pagination;
        })
        .catch((error) => console.error("Error fetching users:", error));
    };

  paginationContainer.addEventListener("click", (e) => {
    const target = e.target.closest("button");
    if (!target) return;

    const page = target.dataset.page;

    if (page === "prev") {
      if (currentPage > 1) {
        fetchOrders(getCurrentSort(), currentPage - 1);
      }
    } else if (page === "next") {
      fetchOrders(getCurrentSort(), currentPage + 1);
    } else {
      const pageNum = parseInt(page, 10);
      if (!isNaN(pageNum)) {
        fetchOrders(getCurrentSort(), pageNum);
      }
    }
  });

  sortSelect.addEventListener("change", () => {
    const filters = getCurrentSort();
    fetchOrders(filters);
  });

  fetchOrders(getCurrentSort());

});

async function placeOrder()  {

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
    displayNotification("Please fill all fields.", "error");
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
      displayNotification("Order failed. Please try again.", "error");
    }

  } catch (error) {
    console.error(error);
    displayNotification("An error occurred. Please try again later.", "error");
  }

}

async function openOrderDetail(orderId) {
  try {
    window.location.href = `/orders/${orderId}`; // Redirect to homepage
  } catch (error) {
    console.error(error);
    displayNotification("Cannot load order.", "error");
  }
}
    
window.placeOrder = placeOrder;
window.openOrderDetail = openOrderDetail;
    