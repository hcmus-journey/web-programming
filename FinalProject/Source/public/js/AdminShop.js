document.addEventListener("DOMContentLoaded", function () {
  const filterSection = document.getElementById("filterSection");
  const filterToggle = document.getElementById("filterToggle");
  const filterClose = document.getElementById("filterClose");
  const applyFilterBtn = document.getElementById("applyFilter");
  const resetFilterBtn = document.getElementById("resetFilter");
  const sortSelect = document.getElementById("sort");
  const productListContainer = document.getElementById("productListContainer");
  const searchForm = document.querySelector(".search-form");

  // Function to get current filter values
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

  // Function to fetch and update product list
  const fetchProducts = (filters) => {
    const params = new URLSearchParams(filters);
    const url = `/shop?${params.toString()}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("productListContainer").innerHTML = data.html;
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

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
  searchForm?.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting normally
    const filters = getCurrentFilters();
    fetchProducts(filters);
  });

  // Initial fetch of products (optional, if you want to load products on page load)
  fetchProducts(getCurrentFilters());
});
