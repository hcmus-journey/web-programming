  document.addEventListener("DOMContentLoaded", function () {
    const sortSelect = document.getElementById("sort");
    const paginationContainer = document.querySelector(".pagination-controls");
    const searchForm = document.querySelector(".search-form");
  
    let currentPage = 1; // Track the current page
    
    const getCurrentSort = () => {
      const sort = sortSelect.value;
      const query = document.getElementById("search").value;
      return {
        sort,
        query,
      };
    };
  
    const fetchUsers = (filters, page = 1) => {
      currentPage = page; // Update the current page
      const params = new URLSearchParams({ ...filters, page });
      const url = `/admin/users?${params.toString()}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("userList").innerHTML = data.html;
          paginationContainer.innerHTML = data.pagination;
        })
        .catch((error) => console.error("Error fetching users:", error));
    };
  
  
    // Event listeners for pagination
    paginationContainer.addEventListener("click", (e) => {
      const target = e.target.closest("button");
      if (!target) return;
  
      const page = target.dataset.page;
  
      if (page === "prev") {
        if (currentPage > 1) {
          fetchUsers(getCurrentSort(), currentPage - 1);
        }
      } else if (page === "next") {
        fetchUsers(getCurrentSort(), currentPage + 1);
      } else {
        const pageNum = parseInt(page, 10);
        if (!isNaN(pageNum)) {
          fetchUsers(getCurrentSort(), pageNum);
        }
      }
    });
  
    sortSelect.addEventListener("change", () => {
      const filters = getCurrentSort();
      fetchUsers(filters);
    });
  
    // Handle search form submit via AJAX
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the form from submitting normally
      const filters = getCurrentSort();
      fetchUsers(filters);
    });
  
    // Initial fetch of products (optional, if you want to load products on page load)
    fetchUsers(getCurrentSort());
  });
  