const navItems = document.querySelectorAll('.nav-items');
[...navItems].map((navItem) => {
    navItem.addEventListener("click", showClothes);
});

window.addEventListener('click', (event) => {
    if (event.target.id == 'background-fade' || event.target.id == 'navbar')
        hideClothes();
    if (event.target == modal)
        modal.style.display = "none";
});

let closeButton = document.getElementById('closeButton');
let itemsData = document.getElementById("items-data");
let itemBox = document.getElementById("item-box");
let backgroundFade = document.getElementById("background-fade");
let productContainer = document.getElementById('product-container');
let cartMsg = document.getElementById('cart-msg');
let cartCounting = document.getElementById('cart-count');

closeButton.addEventListener('click', hideClothes);

function parsingItems(itemName) {
    let uniqueValue = 1;

    if (itemName == 'men')
        section(menSection, uniqueValue);
    else if (itemName == 'women')
        section(womenSection, uniqueValue);
    else if (itemName == 'kids')
        section(kidsSection, uniqueValue);
    else if (itemName == 'homeandliving')
        section(homeAndLivingSection, uniqueValue);
    else if (itemName == 'offers') {
        const offersJsonData = Object.keys(offersSection);
        const offersJsonValue = Object.values(offersSection);
        let htmz = "";
        const checkEmpty = (ele) => ele === '';
        if (!offersJsonValue.every(checkEmpty)) {
            offersJsonData.map((offerKeys, index) => {
                if (offersSection[offerKeys] != '') {
                    htmz += (index % 2 != 0) ? `<ul class='items items-even'>` : `<ul class='items items-odd'>`;
                    htmz += `<li class='item-category' style='color:#f26a10'>${offerKeys}</li>
                            <ul class='item-sub-category'>`;
                    offersSection[offerKeys].map((value) => {
                        htmz += `<li><a href=''>${value}</a></li>`;
                    })
                    htmz += `<hr class='hr-line'>
                            </ul>
                            </ul>`;
                }
            });
            itemsData.innerHTML = htmz;
        } else
            itemsData.innerHTML = "<div style='text-align:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:green;opacity:0.7;'>We Don't have any offers right now for you!!!</div>";
    }
}

let section = (sectionValue, uniqueValue) => {
    let htmz = "";
    const sectionData = Object.keys(sectionValue);
    sectionData.map((value, index) => {
        htmz += (index % 2 != 0) ? `<ul class='items items-even'>` : `<ul class='items items-odd'>`;
        htmz += `<li class='item-category' style='color:#ee5f73'>${value}</li>
                    <ul class='item-sub-category'>`;
        for (const [key, value] of Object.entries(sectionValue[sectionData[index]])) {
            let clothesKey = key;
            let clothesValue = value;
            htmz += `<li class='' onclick=toggleData('${uniqueValue}')><a href='#'>${clothesKey}<i class='fas fa-chevron-down'></a></i></li>
                        <div id=${uniqueValue} class='dropdown-content'>`;

            [...clothesValue].map(value => {
                let url = window.location.href;
                let prodDetails = url.split('?');
                htmz += `<li style='margin-left:15px;'><a data-value="${value}" onclick="productPage('${value}')" href=${(prodDetails.length == 2) ? 'index.html' : '#'}>${value}</a></li>`;
            });
            uniqueValue++;
            htmz += `</div>`;
        }

        htmz += `<hr class='hr-line'>
                    </ul>
                    </ul>`;
    });
    uniqueValue++;
    itemsData.innerHTML = htmz;
}

const sectionArray = ['men', 'women', 'kids', 'homeandliving', 'offers'];

const toggleActive = (sectionValue, currentElement) => {
    currentElement.classList.add('active');
    sectionArray.map((ele) => {
        if (sectionValue != ele) {
            document.getElementById(ele).classList.remove('active');
        }
    });
}

function showClothes(event) {
    let show = 'visibility:visible;opacity:1;transition: all .6s ease-out;'
    parsingItems(event.target.dataset.value);

    toggleActive(event.target.dataset.value, this);
    itemBox.style.cssText = show;
    backgroundFade.style.visibility = 'visible';
    closeButton.style.visibility = 'visible';
}

function hideClothes() {
    let hide = 'visibility:hidden;opacity:0;transition: all .5s ease-out;';
    itemBox.style.cssText = hide;
    backgroundFade.style.visibility = 'hidden';
    closeButton.style.visibility = 'hidden';

    /*hiding if any active class is there*/
    sectionArray.map((ele) => {
        document.getElementById(ele).classList.remove('active');
    });
}

function toggleData(id) {
    const showValue = document.getElementById(id).classList.toggle("show");

    if (this.event.target.nodeName == 'A' || this.event.target.nodeName == 'I')
        this.event.target.parentElement.classList.toggle('item-bolded');
    else
        this.event.target.firstElementChild.classList.toggle('item-bolded');

    if (showValue) {
        if (this.event.target.firstElementChild)
            this.event.target.firstElementChild.style.transform = 'rotate(0deg)';
        else
            this.event.target.style.transform = 'rotate(0deg)';
    }
    else {
        if (this.event.target.firstElementChild)
            this.event.target.firstElementChild.style.transform = 'rotate(-90deg)';
        else
            this.event.target.style.transform = 'rotate(-90deg)';
    }
}

const searchWrapper = document.querySelector('#search');
const inputBox = document.querySelector('#search-bar');
const suggBox = document.querySelector('.autocomplete-box');

inputBox.onfocus = () => {
    hideClothes();
}

inputBox.onkeyup = (e) => {
    let userData = e.target.value;
    let searchArray = [];
    if (userData) {
        searchArray = productsList['T-Shirts'].filter((data) => {
            return data.name.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        searchArray = searchArray.map((data) => {
            return data = `<li>${data.name}</li>`;
        });
        searchWrapper.classList.add('activate');
    } else
        searchWrapper.classList.remove('activate');

    showSuggestions(searchArray);
}

function showSuggestions(list) {
    let listData = !list.length ? `<li>Sorry,product not available</li>` : list.join('');
    suggBox.innerHTML = listData;
}

function productPage(val, filterActive = '') {
    hideClothes();
    let productList = productsList[val];
    let finalProduct = '';
    let fetchFilter = '';

    for (const [filterName, filterValues] of Object.entries(filterList)) {
        fetchFilter += `<div>`;
        fetchFilter += `<h3 class="filter-name">${filterName}</h3>`;
        filterValues.map((filterValue) => {
            fetchFilter += `
                <div class="filter">
                <input type="checkbox" onclick="filterData('${filterValue}','${val}','${filterName}')"><span>${filterValue}</span>
            </div>`
        })
        fetchFilter += `</div>`;
    }
    productList.map((product) => {
        finalProduct += fetchingProducts(product, val);
    })
    document.getElementById('product-filters').innerHTML = fetchFilter;
    productContainer.innerHTML = finalProduct;
    document.body.style.backgroundImage = 'none';
}

let content = document.getElementById('product-filters');

window.onresize = () => {
    if (screen.availWidth < 768) {
        document.getElementById('show-filter').addEventListener("click", function () {
            if (content.style.display === "block") {
                content.style.display = "none";
                document.getElementById('show-filter').innerHTML = 'FILTERS';
            } else {
                content.style.display = "block";
                document.getElementById('show-filter').innerHTML = 'CLOSE';
            }
        });
        content.style.display = "none";
        document.getElementById('show-filter').style.display = 'block';

    } else {
        document.getElementById('product-filters').style.display = 'block';
        document.getElementById('show-filter').style.display = 'none';
    }
};

let selectedFilter = {
    'BRAND': [], 'PRICE': [], 'COLOR': [], 'DISCOUNT': []
};

function filterData(value, selectedSection, filterSection) {
    let finalPriceValues;
    let fetchedProduct = [];
    let dummyArray = [];
    let finalProduct = '';
    let productList = productsList[selectedSection];

    if (this.event.target.checked)
        selectedFilter[filterSection].push(value);
    else
        selectedFilter[filterSection] = selectedFilter[filterSection].filter(item => item != value);

    if (selectedFilter.BRAND.length != 0)
        fetchedProduct = brandColorDiscountFilter(fetchedProduct, dummyArray, selectedFilter, productList, 'BRAND', 'name');
    if (selectedFilter.COLOR.length != 0)
        fetchedProduct = brandColorDiscountFilter(fetchedProduct, dummyArray, selectedFilter, productList, 'COLOR', 'color');
    if (selectedFilter.DISCOUNT.length != 0)
        fetchedProduct = brandColorDiscountFilter(fetchedProduct, dummyArray, selectedFilter, productList, 'DISCOUNT', 'discount');
    if (selectedFilter.PRICE.length != 0)
        fetchedProduct = priceFilter(fetchedProduct, dummyArray, selectedFilter, productList, finalPriceValues);

    fetchedProduct.map((data) => {
        finalProduct += fetchingProducts(data, selectedSection);
    });

    if (fetchedProduct.length != 0)
        productContainer.innerHTML = finalProduct;
    else
        productPage(selectedSection);
}

function brandColorDiscountFilter(fetchedProduct, dummyArray, selectedFilter, productList, productSection, productKey) {
    if (fetchedProduct.length != 0) {
        dummyArray = fetchedProduct;
        fetchedProduct = [];
        dummyArray.map((product) => {
            selectFilter(product, selectedFilter, productKey, productSection, fetchedProduct);
        })
    } else {
        productList.map((product) => {
            selectFilter(product, selectedFilter, productKey, productSection, fetchedProduct)
        })
    }
    return fetchedProduct;
}

function selectFilter(product, selectedFilter, productKey, productSection, fetchedProduct) {
    selectedFilter[productSection].map((check) => {
        if (productKey == 'discount')
            check = check.slice(0, 3);
        if (check == product[productKey])
            fetchedProduct.push(product);
    });
}

function priceFilter(fetchedProduct, dummyArray, selectedFilter, productList, finalPriceValues) {
    if (selectedFilter['PRICE'].length != 0)
        finalPriceValues = priceSplit(selectedFilter['PRICE']);
    else
        finalPriceValues = '';

    if (fetchedProduct.length != 0) {
        dummyArray = fetchedProduct;
        fetchedProduct = [];
        dummyArray.map((product) => {
            let comparePrice = (product.price).slice(3);
            if (comparePrice >= finalPriceValues[0] && comparePrice <= finalPriceValues[1])
                fetchedProduct.push(product);
        })
    } else {
        productList.map((product) => {
            let comparePrice = (product.price).slice(3);
            if (comparePrice >= finalPriceValues[0] && comparePrice <= finalPriceValues[1])
                fetchedProduct.push(product);
        })
    }
    return fetchedProduct;
}

function fetchingProducts(product, val = "") {
    if (product.name != '') {
        return `<div id="${product.productId}" class="product-card">
                <a target="_blank" href="productDetails.html?cat=${val}&prodId=${product.productId}&brand=${product.name}&desc=${product.description}">
                    <img style="max-width:100%;max-height:100%;" src="${product.image[0]}" alt="">
                </a>
                <div id="product-details" class="product-details">
                    <h3 class="product-brand">${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    <p class="product-price">${product.price}<span class="product-discount"> (${product.discount} OFF)</span></p>
                    <button class="cart-button" onclick="productCart('${product.image[0]}','${product.name}','${product.description}','${product.price}','${product.productId}')">ADD TO CART</button>
                </div>
            </div>`;
    } else {
        return `<div class="product-card" style="color:green;position:absolute;left:50%;top:50%;bottom:50%;translate:transformY(-50%,-50%)">
                    No Products available for the required filter!!!
                </div>`;
    }
}

function priceSplit(filterArray) {
    let priceArray = [];
    filterArray.map((value) => {
        let filterPrice = value;
        let priceSplit = filterPrice.split(' ');
        let priceFirstValue = priceSplit[0].slice(3);
        let priceSecondValue = priceSplit[2].slice(3);
        priceArray.push(priceFirstValue);
        priceArray.push(priceSecondValue);
    });

    priceArray = priceArray.filter((value, index, self) => {
        return self.indexOf(value) === index;
    })

    let minPrice = Math.min(...priceArray);
    let maxPrice = Math.max(...priceArray);

    return [minPrice, maxPrice];
}

let checkArray = JSON.parse(localStorage.getItem('cartItems'));
let cartArray = checkArray != null ? checkArray : [];

function productCart(img, name, desc, price, productId) {

    let productAdded = {
        'id': productId,
        'img': img,
        'name': name,
        'desc': desc,
        'price': price,
        'qty': '1'
    };

    setTimeout(() => {
        cartMsg.style.display = "none";
    }, 1200);
    cartMsg.style.display = "block";
    cartMsg.innerHTML = 'Added to the Cart!!!';


    let res = cartArray.filter((data) => {
        return data.id == productId
    });

    if (res.length !== 0) {
        cartArray.map((data) => {
            if (data.id == productId) {
                // data.qty++;
                cartMsg.style.display = "block";
                cartMsg.innerHTML = 'Item already added!!!';
            }
        });
    } else {
        cartArray.push(productAdded);
    }
    cartCount();
    localStorage.setItem('cartItems', JSON.stringify(cartArray));
}

function cartCount() {
    if (cartArray.length == 0)
        cartCounting.style.display = "none";
    else {
        cartCounting.style.display = "block";
        cartCounting.innerHTML = (cartArray.length);
    }
}
cartCount();
let cartItems = JSON.parse(localStorage.getItem('cartItems'));
let cartTotal = document.getElementById('cart-total');
let emptyCart = document.getElementById('empty-cart');
function displayCart() {
    cartCount();
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems.length == 0) {
        cartTotal.style.display = 'none';
        emptyCart.style.display = 'block';
        emptyCart.innerText = "No Items in the cart,please add some items!!!";
    }
    else {
        emptyCart.style.display = 'none';
        cartTotal.style.display = 'block';
    }

    let finalCart = '';
    cartItems.map((cart, cartIndex) => {
        finalCart += `<div class="cart-card">
                <img class="cart-img" alt="" src="${cart.img}">
                <div id="cart-product-details" class="cart-product-details">
                    <h3 class="cart-product-brand">${cart.name}</h3>
                    <p class="cart-product-desc">${cart.desc}</p>
                    <select name="" id="" onchange="quantity(this.value,'${cart.price}','cart-${cart.id}')" style="outline:none;border-radius:2px;background:#f5f5f6;border:none;text-align:Center;color:black;">
                        <option value="1" ${cart.qty == 1 ? 'selected' : ''}>Qty:1</option>
                        <option value="2" ${cart.qty == 2 ? 'selected' : ''}>Qty:2</option>
                        <option value="3" ${cart.qty == 3 ? 'selected' : ''}>Qty:3</option>
                        <option value="4" ${cart.qty == 4 ? 'selected' : ''}>Qty:4</option>
                        <option value="5" ${cart.qty == 5 ? 'selected' : ''}>Qty:5</option>
                    </select>

                    <div style="margin-top:55px;">
                        <span id="remove-${cartIndex}" class="removeItem" onclick=removeItem(this.id)>REMOVE</span>
                    </div>
                    </div>
                <div class="cart-product-price">
                    <p id="cart-${cart.id}">${cart.price}</p>
                </div>
            </div>`;
        displayPrice(cart.price);
    });
    document.getElementById('cart-products').innerHTML = finalCart;
}

function displayPrice(totalPrice) {
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
    let priceFilter = totalPrice.slice(3);
    totalPrice = parseInt(priceFilter);
    let totalMrp = 0;

    cartItems.map((data) => {
        let price = parseInt((data.price).slice(3));
        totalMrp += price;
    })

    let shippingCharges = 50;
    let cartPrice = '';
    cartPrice += `<div class="cart-total">
        <div class="cart-details">
            PRICE DETAILS
        </div>
        <div class="price-total">
            <span>Total MRP</span>
            <span style="float: right;">Rs.${totalMrp}</span>
        </div>
        <div class="price-total">
            <span>Shipping Charges</span>
            <span style="float: right;">Rs.${shippingCharges}</span>
        </div>
        <hr>
        <div class="price-total">
            <b>
                <span>Total Amount</span>
                <span id="totalPrice" style="float: right;">Rs.${totalMrp + shippingCharges}</span>
            </b>
        </div>
        <button style="width: 100%;padding:10px;margin-top:10px;background-color: #ff3f6c;color:white;border:none;font-size:14px;">CHECKOUT</button>
    </div>`;
    cartTotal.innerHTML = cartPrice;
}

function quantity(qty, price, id) {
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
    let productPrice = parseInt(price.slice(3));
    let dataId = id.slice(5);
    let finalPrice = productPrice * qty;
    document.getElementById(id).innerHTML = `Rs.${finalPrice}`;
    cartItems.map((data) => {
        if (data.id === dataId) {
            data.price = document.getElementById(id).innerText;
            data.qty = qty;
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    });
    setTimeout(() => {
        displayPrice(document.getElementById(id).innerText);
    }, 100)
}

function removeItem(id) {
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
    cartItems.splice(id, 1);
    cartArray.splice(id, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCart();
}

let modal = document.getElementById('modal');
let cartBtn = document.getElementById('cartBtn');
let closeBtn = document.getElementById('closeBtn');

cartBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    displayCart();
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

