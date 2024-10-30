
class Product {
    constructor(id, imgLink, name, available, brand, category, sku, price, ogPrice, description) {
        this.id = id;
        this.imgLink = imgLink;
        this.name = name;
        this.available = available;
        this.brand = brand;
        this.category = category;
        this.sku = sku;
        this.price = price;
        this.ogPrice = ogPrice;
        this.description = description;
    }
}

const imgHoverClass = "absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition";
const imgAClass = "text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition";
const nameH4Class = "uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition";
const pricesDivClass = "flex items-baseline mb-1 space-x-2 prices";
const pricePClass = "text-xl text-primary font-semibold price";
const ogPricePClass = "text-sm text-gray-400 line-through ogPrice";
const addToCartClass = "block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition";
const productDivClass = "bg-white shadow rounded overflow-hidden group"

function createImgDiv(imgLink, productID, encodedProduct)
{
    let imgDiv = document.createElement("div");
    imgDiv.setAttribute('class', "relative imgLink");

    let product1Img = document.createElement("img");
    product1Img.setAttribute('src', imgLink);
    product1Img.setAttribute('alt', productID);
    product1Img.setAttribute('class', "w-full");


    let hoverDiv = document.createElement("div");
    hoverDiv.setAttribute('class', imgHoverClass);

    let hoverA = document.createElement("a");
    hoverA.setAttribute('class', imgAClass);
    hoverA.setAttribute('title', "view product");
    hoverA.setAttribute('href', "product.html" + `?index=${encodedProduct}`)

    let hoverI = document.createElement("i");
    hoverI.setAttribute('class', "fa-solid fa-magnifying-glass");

    hoverA.appendChild(hoverI);
    hoverDiv.appendChild(hoverA);
    imgDiv.appendChild(product1Img);
    imgDiv.appendChild(hoverDiv);

    return imgDiv;
}

function createNameDiv(name, price, ogPrice)
{
    let nameDiv = document.createElement("div");
    nameDiv.setAttribute('class', "pt-4 pb-3 px-4 name");

    let nameA = document.createElement("a");
    
    let nameH4 = document.createElement("h4");
    nameH4.setAttribute('class', nameH4Class);
    nameH4.innerHTML = name;

    let pricesDiv = createPricesDiv(price, ogPrice);

    nameA.appendChild(nameH4);
    nameDiv.appendChild(nameA);
    nameDiv.appendChild(pricesDiv);   

    return nameDiv;
}

function createPricesDiv(price, ogPrice)
{
    let pricesDiv = document.createElement("div");
    pricesDiv.setAttribute('class', pricesDivClass);

    let priceP = document.createElement("p");
    priceP.setAttribute('class', pricePClass);
    priceP.innerHTML = "$" + price.toFixed(2);

    let ogPriceP = document.createElement("p");
    ogPriceP.setAttribute('class', ogPricePClass);
    ogPriceP.innerHTML = "$" + ogPrice.toFixed(2);

    pricesDiv.appendChild(priceP);
    pricesDiv.appendChild(ogPriceP);

    return pricesDiv;
}

function createAddToCart()
{
    let addToCart = document.createElement("a");
    addToCart.setAttribute('class', addToCartClass);
    addToCart.innerHTML = "Add to cart";

    return addToCart;
}

function createProductDiv(product)
{
    let productDiv = document.createElement("div");
    productDiv.setAttribute('class', productDivClass);
    productDiv.setAttribute('id', product.id);

    let encodedProduct = encodeURIComponent(JSON.stringify(product));

    imgDiv = createImgDiv(product.imgLink, product.id, encodedProduct)
    nameDiv = createNameDiv(product.name, product.price, product.ogPrice);
    addToCart = createAddToCart();

    productDiv.appendChild(imgDiv);
    productDiv.appendChild(nameDiv);
    productDiv.appendChild(addToCart);

    return productDiv;
}

let products = [];
products.push(new Product("product1", "../assets/images/products/product1.jpg", "Product 1", true, "Brand A", "Sofa", "BE45VGRT", 45.00, 55.90, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eius eum reprehenderit dolore vel mollitia optio consequatur hic asperiores inventore suscipit, velit consequuntur, voluptate doloremque iure necessitatibus adipisci magnam porro."));
products.push(new Product("product2", "../assets/images/products/product2.jpg", "Product 2", false, "Brand B", "Sofa", "BE46VGRT", 55.00, 65.90, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eius eum reprehenderit dolore vel mollitia optio consequatur hic asperiores inventore suscipit, velit consequuntur, voluptate doloremque iure necessitatibus adipisci magnam porro."));
products.push(new Product("product3", "../assets/images/products/product3.jpg", "Product 3", true, "Brand C", "Bed", "BE47VGRT", 65.00, 75.90, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eius eum reprehenderit dolore vel mollitia optio consequatur hic asperiores inventore suscipit, velit consequuntur, voluptate doloremque iure necessitatibus adipisci magnam porro."));
products.push(new Product("product4", "../assets/images/products/product4.jpg", "Product 4", false, "Brand D", "Bed", "BE48VGRT", 75.00, 85.90, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eius eum reprehenderit dolore vel mollitia optio consequatur hic asperiores inventore suscipit, velit consequuntur, voluptate doloremque iure necessitatibus adipisci magnam porro."));
products.push(new Product("product5", "../assets/images/products/product5.jpg", "Product 5", true, "Brand E", "Kitchen", "BE49VGRT", 65.00, 75.90, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eius eum reprehenderit dolore vel mollitia optio consequatur hic asperiores inventore suscipit, velit consequuntur, voluptate doloremque iure necessitatibus adipisci magnam porro."));
products.push(new Product("product6", "../assets/images/products/product6.jpg", "Product 6", false, "Brand F", "Chair", "BE50VGRT", 45.00, 55.90, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eius eum reprehenderit dolore vel mollitia optio consequatur hic asperiores inventore suscipit, velit consequuntur, voluptate doloremque iure necessitatibus adipisci magnam porro."));

for (let i = 0; i < products.length; i++)
{
    let productDiv = createProductDiv(products[i]);

    const productList = document.getElementById("productList");

    productList.appendChild(productDiv);
}


