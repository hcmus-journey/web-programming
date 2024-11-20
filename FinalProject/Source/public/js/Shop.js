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
    if (
      !filterSection.contains(e.target) &&
      !filterToggle.contains(e.target) &&
      !toggleCategories.contains(e.target) &&
      !categoriesIcon.contains(e.target) &&
      !toggleManufacturers.contains(e.target) &&
      !manufacturersIcon.contains(e.target)
    ) {
      filterSection.classList.remove("show"); // Đóng filter section
    }
  });

  // Toggle visibility of categories
  const toggleCategories = document.getElementById("toggleCategories");
  const categoriesList = document.getElementById("categoriesList");
  const categoriesIcon = document.getElementById("categoriesIcon");

  toggleCategories.addEventListener("click", (e) => {
    // Đảm bảo sự kiện xảy ra khi click vào tiêu đề hoặc icon
    if (e.target.closest("#categoriesIcon") || e.target === toggleCategories) {
      const isHidden = categoriesList.classList.toggle("hidden"); // Toggle hiển thị dropdown
      categoriesIcon.innerHTML = isHidden
        ? '<i class="fa-solid fa-plus"></i>' // Icon +
        : '<i class="fa-solid fa-minus"></i>'; // Icon -
    }
  });

  // Toggle visibility of manufacturers
  const toggleManufacturers = document.getElementById("toggleManufacturers");
  const manufacturersList = document.getElementById("manufacturersList");
  const manufacturersIcon = document.getElementById("manufacturersIcon");

  toggleManufacturers.addEventListener("click", (e) => {
    // Đảm bảo sự kiện xảy ra khi click vào tiêu đề hoặc icon
    if (
      e.target.closest("#manufacturersIcon") ||
      e.target === toggleManufacturers
    ) {
      const isHidden = manufacturersList.classList.toggle("hidden"); // Toggle hiển thị dropdown
      manufacturersIcon.innerHTML = isHidden
        ? '<i class="fa-solid fa-plus"></i>' // Icon +
        : '<i class="fa-solid fa-minus"></i>'; // Icon -
    }
  });

  // Apply Filters functionality
  document.getElementById("applyFilter").addEventListener("click", function () {
    const categories = Array.from(
      document.querySelectorAll('input[name="catVal"]:checked')
    ).map((el) => el.id.split("+")[1]);
    const manufacturers = Array.from(
      document.querySelectorAll('input[name="brandVal"]:checked')
    ).map((el) => el.id.split("+")[1]);
    const minPrice = document.getElementById("min").value;
    const maxPrice = document.getElementById("max").value;
    const status = document.querySelector('input[name="status"]:checked')
      ? document.querySelector('input[name="status"]:checked').value
      : "";
    const sort = document.getElementById("sort").value;
    const query = document.getElementById("search").value;

    const queryParams = new URLSearchParams({
      categories: categories.join(","),
      manufacturers: manufacturers.join(","),
      minPrice,
      maxPrice,
      status,
      sort,
      query,
    });

    window.location.href = `/shop?${queryParams.toString()}`;
  });

  // Reset Filters functionality
  document.getElementById("resetFilter").addEventListener("click", function () {
    document
      .querySelectorAll('input[name="catVal"]:checked')
      .forEach((el) => (el.checked = false));
    document
      .querySelectorAll('input[name="brandVal"]:checked')
      .forEach((el) => (el.checked = false));
    document.getElementById("min").value = "";
    document.getElementById("max").value = "";
    document
      .querySelectorAll('input[name="status"]:checked')
      .forEach((el) => (el.checked = false));
    document.getElementById("sort").value = "";
    document.getElementById("search").value = "";
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
