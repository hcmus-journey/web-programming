document.addEventListener("DOMContentLoaded", function () {
  const filterToggle = document.getElementById("filterToggle");
  const filterSection = document.getElementById("filterSection");
  const filterClose = document.getElementById("filterClose");

  // Open the filter section
  filterToggle.addEventListener("click", () => {
    filterSection.classList.add("show");
  });

  // Close the filter section
  filterClose.addEventListener("click", () => {
    filterSection.classList.remove("show");
  });

  // Optional: Close filter if clicking outside of it
  document.addEventListener("click", (e) => {
    if (!filterSection.contains(e.target) && !filterToggle.contains(e.target)) {
      filterSection.classList.remove("show");
    }
  });

  // Toggle visibility of categories
  document
    .getElementById("toggleCategories")
    .addEventListener("click", function () {
      const categoriesList = document.getElementById("categoriesList");
      categoriesList.classList.toggle("hidden");
    });

  // Toggle visibility of manufacturers
  document
    .getElementById("toggleManufacturers")
    .addEventListener("click", function () {
      const manufacturersList = document.getElementById("manufacturersList");
      manufacturersList.classList.toggle("hidden");
    });

  // Apply Filters functionality
  document.getElementById("applyFilter").addEventListener("click", function () {
    const categories = Array.from(document.querySelectorAll('input[name="catVal"]:checked')).map(el => el.id.split('+')[1]);
    const manufacturers = Array.from(document.querySelectorAll('input[name="brandVal"]:checked')).map(el => el.id.split('+')[1]);
    const minPrice = document.getElementById('min').value;
    const maxPrice = document.getElementById('max').value;
    const status = document.querySelector('input[name="status"]:checked') ? document.querySelector('input[name="status"]:checked').value : '';
    const sort = document.getElementById('sort').value;
    const query = document.getElementById('search').value;

    const queryParams = new URLSearchParams({
      categories: categories.join(','),
      manufacturers: manufacturers.join(','),
      minPrice,
      maxPrice,
      status,
      sort,
      query
    });

    window.location.href = `/shop?${queryParams.toString()}`;
  });

  // Reset Filters functionality
  document.getElementById("resetFilter").addEventListener("click", function () {
    document.querySelectorAll('input[name="catVal"]:checked').forEach(el => el.checked = false);
    document.querySelectorAll('input[name="brandVal"]:checked').forEach(el => el.checked = false);
    document.getElementById('min').value = '';
    document.getElementById('max').value = '';
    document.querySelectorAll('input[name="status"]:checked').forEach(el => el.checked = false);
    document.getElementById('sort').value = '';
    document.getElementById('search').value = '';
  });

  const sortDropdown = document.getElementById("sort");

  if (sortDropdown) {
    sortDropdown.addEventListener("change", function () {
      const selectedSort = sortDropdown.value;
      const currentUrl = new URL(window.location.href);
      if (selectedSort) {
        currentUrl.searchParams.set("sort", selectedSort);
      } else {
        currentUrl.searchParams.delete("sort");
      }
      window.location.href = currentUrl.toString();
    });
  }
});
