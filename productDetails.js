$(document).ready(function () {
    var slider = $('#autoWidth').lightSlider({
        item: 4,
        controls: false,
        autoWidth: true,
        loop: true,
        onSliderLoad: function () {
            $('#autoWidth').removeClass('cS-hidden');
            $('.lslide').removeClass('active');
        }
    });
    $('#goToPrevSlide').on('click', function () {
        slider.goToPrevSlide();
    });
    $('#goToNextSlide').on('click', function () {
        slider.goToNextSlide();
    });
});

let relatedItems = '';

function fetchedProducts(id,cat, brandName, desc) {
    let product = productsList[cat];

    product.map((prod) => {
        if (prod.name == brandName && prod.description == desc) {
            if (prod.productId == id) {
                document.getElementById('prod-brand').innerHTML = brandName;
                document.getElementById('prod-desc').innerHTML = desc;
                document.getElementById('prod-price').innerHTML = prod.price;
                let btn = `<button class="prod-cartBtn" onclick="productCart('${prod.image[0]}','${prod.name}','${prod.description}','${prod.price}','${prod.productId}')"><i class="fas fa-shopping-cart"></i> ADD TO
            CART</button>
            <button class="prod-wishBtn" style="background:white;color:black"><i
                        class="far fa-heart"></i>WISHLIST</button>`;
                document.getElementById('cart-btn').innerHTML = btn;
            }
            let prodImg = '';
            prod.image.forEach(element => {
                prodImg += `<div class="img-grid">
                <img src="${element}" alt="">
                </div>`;
            });
            document.getElementById('prod-img').innerHTML = prodImg;
        }

        if (prod.name == brandName || prod.description == desc) {
            relatedItems += `
            <li class="item">
                <div class="related-product">
                <a target="_blank" href="productDetails.html?cat=${cat}&prodId=${prod.productId}&brand=${prod.name}&desc=${prod.description}">
                    <img style="max-width:80%;max-height:80%;" src="${prod.image[0]}" alt="">
                </a>
                    <h3 class="product-brand">${prod.name}</h3>
                    <p class="product-desc">${prod.description}</p>
                    <p class="product-price">${prod.price}<span class="product-discount"> (${prod.discount} OFF)</span></p>
                </div>
            </li>`;
        }
    });
    document.getElementById('autoWidth').innerHTML = relatedItems;
}

function loadProduct() {
    let url = window.location.href;
    let prodDetails = url.split('?');
    let prod = prodDetails[1].split('&');
    let cat = prod[0].split('=')[1];
    let id = prod[1].split('=')[1];
    let brandName = prod[2].split('=')[1].replaceAll('%20', ' ');
    let desc = prod[3].split('=')[1].replaceAll('%20', ' ');;
    fetchedProducts(id,cat, brandName, desc);
}

loadProduct();