function createProductHTML(product) {
  let encodedProduct = encodeURIComponent(JSON.stringify(product));

  return `
        <div class="${productDivClass}" id="${product.id}">
            <div class="relative imgLink">
                <img src="${product.imgLink}" alt="${
    product.id
  }" class="w-full">
                <div class="${imgHoverClass}">
                    <a class="${imgAClass}" title="view product" href="${
    PageURL.PRODUCT_PAGE_URL
  }?index=${encodedProduct}">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </a>
                </div>
            </div>
            <div class="pt-4 pb-3 px-4 name">
                <a href="${PageURL.PRODUCT_PAGE_URL}?index=${encodedProduct}">
                    <h4 class="${nameH4Class}">${product.name}</h4>
                </a>
                <div class="${pricesDivClass}">
                    <p class="${pricePClass}">$${product.price.toFixed(2)}</p>
                    <p class="${ogPricePClass}">$${product.ogPrice.toFixed(
    2
  )}</p>
                </div>
            </div>
            <a class="${addToCartClass}">Add to cart</a>
        </div>
    `;
}

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
    // Get selected manufacturers
    const selectedBrands = Array.from(
      document.querySelectorAll('input[name="brandVal"]:checked')
    ).map((checkbox) => checkbox.id.split("+")[1]); // Get brand IDs

    // Get selected categories
    const selectedCategories = Array.from(
      document.querySelectorAll('input[name="catVal"]:checked')
    ).map((checkbox) => checkbox.id.split("+")[1]); // Get category IDs

    // Create query string for filters
    const queryParams = new URLSearchParams({
      brandVal: selectedBrands.join(","), // Join IDs into a string
      catVal: selectedCategories.join(","),
    }).toString();

    // Redirect to shop page with query string
    window.location.href = `/shop?${queryParams}`;
  });

  // Reset Filters functionality
  document.getElementById("resetFilter").addEventListener("click", function () {
    // Uncheck all checkboxes
    document
      .querySelectorAll('input[type="checkbox"]')
      .forEach((checkbox) => (checkbox.checked = false));

    // Redirect to shop page without filters
    window.location.href = `/shop`;
  });

  const sortDropdown = document.getElementById("sort");

  if (sortDropdown) {
    sortDropdown.addEventListener("change", function () {
      const selectedSort = sortDropdown.value; // Lấy giá trị đã chọn
      console.log("Selected Sort:", selectedSort);

      // Xử lý điều hướng với sort
      const currentUrl = new URL(window.location.href);
      if (selectedSort) {
        currentUrl.searchParams.set("sort", selectedSort); // Thêm/ghi đè giá trị sort
      } else {
        currentUrl.searchParams.delete("sort"); // Nếu không có sort, xóa tham số
      }

      // Điều hướng lại trang
      window.location.href = currentUrl.toString();
    });
  }

  const applyFilterButton = document.getElementById("applyFilter");

  applyFilterButton.addEventListener("click", () => {
    const minPrice = document.getElementById("min").value;
    const maxPrice = document.getElementById("max").value;
    const status = document.querySelector(
      'input[name="status"]:checked'
    )?.value;

    // Tạo URL với các tham số lọc
    const url = new URL(window.location.href);
    if (minPrice) url.searchParams.set("min", minPrice);
    else url.searchParams.delete("min");

    if (maxPrice) url.searchParams.set("max", maxPrice);
    else url.searchParams.delete("max");

    if (status) url.searchParams.set("status", status);
    else url.searchParams.delete("status");

    // Reload trang với URL mới
    window.location.href = url.toString();
  });
});
