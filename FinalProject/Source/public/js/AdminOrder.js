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
      const url = `/admin/orders?${params.toString()}`;
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

async function openOrderDetail(orderId) {
  try {
    window.location.href = `/admin/orders/${orderId}`;
  } catch (error) {
    console.error(error);
    displayNotification("Cannot load order.", "error");
  }
}
    
window.openOrderDetail = openOrderDetail;
    