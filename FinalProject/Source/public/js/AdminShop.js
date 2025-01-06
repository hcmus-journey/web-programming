document.addEventListener("DOMContentLoaded", function () {
  const toggleCategories = document.getElementById("toggleCategories");
  const categoriesList = document.getElementById("categoriesList");
  const categoriesIcon = document.getElementById("categoriesIcon");

  const toggleManufacturers = document.getElementById("toggleManufacturers");
  const manufacturersList = document.getElementById("manufacturersList");
  const manufacturersIcon = document.getElementById("manufacturersIcon");

  // Toggle categories filter
  toggleCategories.addEventListener("click", function () {
    categoriesList.classList.toggle("hidden");
    const isHidden = categoriesList.classList.contains("hidden");
    categoriesIcon.innerHTML = isHidden
      ? '<i class="fa-solid fa-plus"></i>'
      : '<i class="fa-solid fa-minus"></i>';
  });

  // Toggle manufacturers filter
  toggleManufacturers.addEventListener("click", function () {
    manufacturersList.classList.toggle("hidden");
    const isHidden = manufacturersList.classList.contains("hidden");
    manufacturersIcon.innerHTML = isHidden
      ? '<i class="fa-solid fa-plus"></i>'
      : '<i class="fa-solid fa-minus"></i>';
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const filterSection = document.getElementById("filterSection");
  const filterToggle = document.getElementById("filterToggle");
  const filterClose = document.getElementById("filterClose");
  const applyFilterBtn = document.getElementById("applyFilter");
  const resetFilterBtn = document.getElementById("resetFilter");
  const sortSelect = document.getElementById("sort");
  const paginationContainer = document.querySelector(".pagination-controls");
  const searchForm = document.querySelector(".search-form");

  let currentPage = 1; // Track the current page

  const getCurrentFilters = () => {
    const categories = Array.from(
      document.querySelectorAll('input[name="catVal"]:checked')
    ).map((el) => el.id.split("+")[1]);
    const manufacturers = Array.from(
      document.querySelectorAll('input[name="brandVal"]:checked')
    ).map((el) => el.id.split("+")[1]);
    const minPrice = document.getElementById("min").value;
    const maxPrice = document.getElementById("max").value;
    const status =
      document.querySelector('input[name="status"]:checked')?.value || "";
    const sort = sortSelect.value;
    const query = document.getElementById("search").value;
    return {
      categories,
      manufacturers,
      minPrice,
      maxPrice,
      status,
      sort,
      query,
    };
  };

  const fetchProducts = (filters, page = 1) => {
    currentPage = page; // Update the current page
    const params = new URLSearchParams({ ...filters, page });
    const url = `/shop?${params.toString()}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("productList").innerHTML = data.html;
        paginationContainer.innerHTML = data.pagination;
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  // Event listeners for pagination
  paginationContainer.addEventListener("click", (e) => {
    const target = e.target.closest("button");
    if (!target) return;

    const page = target.dataset.page;

    if (page === "prev") {
      if (currentPage > 1) {
        fetchProducts(getCurrentFilters(), currentPage - 1);
      }
    } else if (page === "next") {
      fetchProducts(getCurrentFilters(), currentPage + 1);
    } else {
      const pageNum = parseInt(page, 10);
      if (!isNaN(pageNum)) {
        fetchProducts(getCurrentFilters(), pageNum);
      }
    }
  });

  // Filter and reset functionality
  filterToggle.addEventListener("click", () =>
    filterSection.classList.add("show")
  );
  filterClose.addEventListener("click", () =>
    filterSection.classList.remove("show")
  );

  applyFilterBtn.addEventListener("click", () => {
    const filters = getCurrentFilters();
    fetchProducts(filters);
  });

  resetFilterBtn.addEventListener("click", () => {
    document
      .querySelectorAll(
        'input[name="catVal"]:checked, input[name="brandVal"]:checked, input[name="status"]:checked'
      )
      .forEach((el) => (el.checked = false));
    document.getElementById("min").value = "";
    document.getElementById("max").value = "";
    sortSelect.value = "";
    document.getElementById("search").value = "";
    fetchProducts({});
  });

  sortSelect.addEventListener("change", () => {
    const filters = getCurrentFilters();
    fetchProducts(filters);
  });

  // Handle search form submit via AJAX
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting normally
    const filters = getCurrentFilters();
    fetchProducts(filters);
  });

  // Initial fetch of products (optional, if you want to load products on page load)
  fetchProducts(getCurrentFilters());
});
