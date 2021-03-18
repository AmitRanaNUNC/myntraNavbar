const navItems = document.querySelectorAll('.nav-items');
[...navItems].map((navItem) => {
    navItem.addEventListener("click", showClothes);
});

window.addEventListener('click', function (event) {
    if (event.target.id == 'background-fade' || event.target.id == 'navbar')
        hideClothes();
});

document.getElementById('closeButton').addEventListener('click', hideClothes);

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
            document.getElementById("items-data").innerHTML = htmz;
        } else
            document.getElementById("items-data").innerHTML = "<div style='text-align:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:green;opacity:0.7;'>We Don't have any offers right now for you!!!</div>";
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
                htmz += `<li style='margin-left:15px;'><a data-value="${value}" onclick="productPage('${value}')" href='#'>${value}</a></li>`;
            });
            uniqueValue++;
            htmz += `</div>`;
        }

        htmz += `<hr class='hr-line'>
                    </ul>
                    </ul>`;
    });
    uniqueValue++;
    document.getElementById("items-data").innerHTML = htmz;
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
    document.getElementById("item-box").style.cssText = show;
    document.getElementById("background-fade").style.visibility = 'visible';
    document.getElementById('closeButton').style.visibility = 'visible';
}

function hideClothes() {
    let hide = 'visibility:hidden;opacity:0;transition: all .5s ease-out;';
    document.getElementById("item-box").style.cssText = hide;
    document.getElementById("background-fade").style.visibility = 'hidden';
    document.getElementById('closeButton').style.visibility = 'hidden';

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
        searchArray = products.searchItems.filter((data) => {
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        searchArray = searchArray.map((data) => {
            return data = `<li>${data}</li>`;
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

let fetchFilter = '';
function productPage(val,filterActive='') {

    hideClothes();
    let productList = productsList[val];
    let fetchedProduct = '';

    if(filterActive != true){
        for (const [filterName, filterValues] of Object.entries(filterList)){
            fetchFilter += `<div>`;
            fetchFilter += `<h3 class="filter-name">${filterName}</h3>`;
            filterValues.map((filterValue)=>{
                fetchFilter += `
                <div class="filter">
                <input type="checkbox" onclick="filterData('${filterValue}','${val}')"><span>${filterValue}</span>
            </div>`
            })
            fetchFilter +=`</div>`;
        }
    }
        productList.map((product) => {
            fetchedProduct += fetchingProducts(product);
        })

    document.getElementById('product-filters').innerHTML = fetchFilter;
    document.getElementById('product-container').innerHTML = fetchedProduct;
    document.body.style.backgroundImage = 'none';
}
let selectedFilter= [];

function filterData(value,selectedSection){
    let fetchedProduct;
    let productList = productsList[selectedSection];

    if(this.event.target.checked)
        selectedFilter.push(value);
    else
        selectedFilter = selectedFilter.filter(item=>item!=value);

    let finalPriceValues;
    fetchedProduct = '';

    if(value.slice(0,3) == 'Rs.'){
        finalPriceValues = priceSplit(selectedFilter);
    }else{
        finalPriceValues = '';
    }
    productList.map((product) => {
        
        let comparePrice = (product.price).slice(3);
        if(comparePrice >= finalPriceValues[0] && comparePrice <= finalPriceValues[1]){
            fetchedProduct += fetchingProducts(product);
        }
        selectedFilter.map((check)=>{
            if(check == product.name || check == product.color || check.slice(0,3) == product.discount){
                fetchedProduct += fetchingProducts(product);
            }  
        });
    })

    if(selectedFilter.length == 0){
        productPage(selectedSection,true);
        document.getElementById('product-container').style.display = '';
        document.getElementById('filter-products').style.display = 'none';
    }else{
        document.getElementById('product-container').style.display = 'none';
        document.getElementById('filter-products').style.display = '';
        document.getElementById('filter-products').innerHTML = fetchedProduct;
    }
}

function fetchingProducts(product){
    return `<div class="product-card">
                <img src="${product.image}" alt="">
                <div id="product-details" class="product-details">
                    <h3 class="product-brand">${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    <p class="product-price">${product.price}<span class="product-discount"> (${product.discount} OFF)</span></p>
                </div>
            </div>`;
}

function priceSplit(filterArray){
    let priceArray = [];
    filterArray.map((value)=>{
        let filterPrice = value;
        let priceSplit = filterPrice.split(' ');
        let priceFirstValue = priceSplit[0].slice(3);
        let priceSecondValue = priceSplit[2].slice(3);
        priceArray.push(priceFirstValue);
        priceArray.push(priceSecondValue);
    });

    priceArray = priceArray.filter((value, index, self)=>{
        return self.indexOf(value) === index;
    })

    let minPrice = Math.min(...priceArray);
    let maxPrice = Math.max(...priceArray);

    return [minPrice, maxPrice];
}

