const params = new URLSearchParams(window.location.search);

// Retrieve the 'index' parameter and decode it
let encodedProduct = params.get("index");

let product = JSON.parse(decodeURIComponent(encodedProduct));

document.getElementById("product-img").setAttribute('src', product.imgLink);
document.getElementById("product-name").innerHTML = product.name;

if (product.available)
{
        document.getElementById("product-avail").innerHTML = "In Stock";
}
else
{
    document.getElementById("product-avail").innerHTML = "Out Of Stock";
}

document.getElementById("product-brand").innerHTML = product.brand;
document.getElementById("product-category").innerHTML = product.category;
document.getElementById("product-sku").innerHTML = product.sku;
document.getElementById("product-price").innerHTML = "$" + product.price.toFixed(2);
document.getElementById("product-ogprice").innerHTML = "$" + product.ogPrice.toFixed(2);
document.getElementById("product-des").innerHTML = product.description;


