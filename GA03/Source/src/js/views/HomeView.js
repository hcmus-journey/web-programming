import {products, topNewArrivals} from '../data/data.js';
import {PageURL} from '../constant/constants.js';

const imgHoverClass = "absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition";
const imgAClass = "text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition";
const nameH4Class = "uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition";
const pricesDivClass = "flex items-baseline mb-1 space-x-2 prices";
const pricePClass = "text-xl text-primary font-semibold price";
const ogPricePClass = "text-sm text-gray-400 line-through ogPrice";
const addToCartClass = "block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition";
const productDivClass = "bg-white shadow rounded overflow-hidden group"


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

document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("productList");
    productList.innerHTML = products.map(createProductHTML).join('');
    
    const topNewArrivalsList = document.getElementById("topNewArrivalsList");
    topNewArrivalsList.innerHTML = topNewArrivals.map(createProductHTML).join('');
});


