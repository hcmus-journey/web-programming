
function createProductHTML(product) {
    let encodedProduct = encodeURIComponent(JSON.stringify(product));

    return `
        <div class="${productDivClass}" id="${product.id}">
            <div class="relative imgLink">
                <img src="${product.imgLink}" alt="${product.id}" class="w-full">
                <div class="${imgHoverClass}">
                    <a class="${imgAClass}" title="view product" href="${PageURL.PRODUCT_PAGE_URL}?index=${encodedProduct}">
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
                    <p class="${ogPricePClass}">$${product.ogPrice.toFixed(2)}</p>
                </div>
            </div>
            <a class="${addToCartClass}">Add to cart</a>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", function() {
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
});

