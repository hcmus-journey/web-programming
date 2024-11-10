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


document.getElementById('filterToggle').addEventListener('click', function () {
  const filterSection = document.getElementById('filterSection');
  filterSection.classList.toggle('show');
});

document.getElementById('filterClose').addEventListener('click', function () {
    const filterSection = document.getElementById('filterSection');
    filterSection.classList.remove('show'); 
  });

