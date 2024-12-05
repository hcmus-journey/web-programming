document.addEventListener("DOMContentLoaded", function () {
  const filterToggle = document.getElementById("filterToggle");
  const filterSection = document.getElementById("filterSection");
  const filterClose = document.getElementById("filterClose");
  const applyFilterBtn = document.getElementById("applyFilter");
  const resetFilterBtn = document.getElementById("resetFilter");
  const sortSelect = document.getElementById("sort");
  const paginationButtons = document.querySelectorAll(".pagination-controls button");

  const getCurrentPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('page')) || 1;
  };

  const getCurrentFilters = () => {
    const categories = Array.from(document.querySelectorAll('input[name="catVal"]:checked')).map(el => el.id.split("+")[1]);
    const manufacturers = Array.from(document.querySelectorAll('input[name="brandVal"]:checked')).map(el => el.id.split("+")[1]);
    const minPrice = document.getElementById("min").value;
    const maxPrice = document.getElementById("max").value;
    const status = document.querySelector('input[name="status"]:checked')?.value || "";
    const sort = sortSelect.value;
    const query = document.getElementById("search").value;
    return { categories, manufacturers, minPrice, maxPrice, status, sort, query };
  };

  const updateURL = (filters, page = 1) => {
    const queryParams = new URLSearchParams({ ...filters, page });
    window.location.href = `/shop?${queryParams.toString()}`;
  };

  filterToggle.addEventListener("click", () => filterSection.classList.add("show"));
  filterClose.addEventListener("click", () => filterSection.classList.remove("show"));

  document.addEventListener("click", (e) => {
    if (!filterSection.contains(e.target) && !filterToggle.contains(e.target)) {
      filterSection.classList.remove("show");
    }
  });

  applyFilterBtn.addEventListener("click", () => {
    const filters = getCurrentFilters();
    updateURL(filters);
  });

  resetFilterBtn.addEventListener("click", () => {
    document.querySelectorAll('input[name="catVal"]:checked, input[name="brandVal"]:checked, input[name="status"]:checked').forEach(el => el.checked = false);
    document.getElementById("min").value = "";
    document.getElementById("max").value = "";
    sortSelect.value = "";
    document.getElementById("search").value = "";
    window.location.href = "/shop";
  });

  paginationButtons.forEach(button => {
    button.addEventListener("click", function () {
      const page = this.dataset.page || (this.id === "prevPage" ? getCurrentPage() - 1 : getCurrentPage() + 1);
      const filters = getCurrentFilters();
      updateURL(filters, page);
    });
  });

  sortSelect.addEventListener("change", function () {
    const filters = getCurrentFilters();
    updateURL(filters);
  });
});
