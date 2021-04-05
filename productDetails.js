$(document).ready(function () {
    $(window).resize(() => {
        if ($(this).width() <= 320) {
            images = 1;
        } else if ($(this).width() <= 576) {
            images = 2;
        } else if ($(this).width() <= 768) {
            images = 3;
        } else if ($(this).width() <= 992) {
            images = 3;
        } else if ($(this).width() > 992) {
            images = 4;
        }
        localStorage.setItem("itemsPerClick", images);
    });

    let totalImages = $(".item").length;
    let posterContainer = $(".poster-container")[0];
    let availScrollWidth = posterContainer.scrollWidth;
    let count = 1;

    $("#goToPrevSlide").click(() => {
        let itemsPerClick = localStorage.getItem("itemsPerClick");
        itemsPerClick = itemsPerClick ? itemsPerClick : 4;
        let scrollcount = Math.ceil(totalImages / itemsPerClick);
        if (count === 1) {
            posterContainer.scrollLeft += availScrollWidth;
            count = scrollcount;
        } else {
            posterContainer.scrollLeft -= posterContainer.clientWidth;
            count--;
        }
    });

    $("#goToNextSlide").click(() => {
        let itemsPerClick = localStorage.getItem("itemsPerClick");
        itemsPerClick = itemsPerClick ? itemsPerClick : 4;
        let scrollcount = Math.ceil(totalImages / itemsPerClick);
        if (count >= scrollcount) {
            posterContainer.scrollLeft = 0;
            count = 1;
        } else {
            posterContainer.scrollLeft += posterContainer.clientWidth;
            count++;
        }
    });
});


let similarProdContainer = document.getElementById('product-wrapper');
let scrollWidth = similarProdContainer.scrollWidth;
let relatedItems = '';

function fetchedProducts(id, cat, brandName, desc) {
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
            let sliderImg = '';
            prodImg += `<div id="main-image">
                <img id="big-image" onmouseout="bigImage()" onmouseover="largeImage()" src="${prod.image[0]}" alt="">
            </div>
            <div id="thumbnail-images">
                <ul class="thumbnail-list">
                    <li><img class="thumImg" onclick="changeImg('${prod.image[0]}')" src="${prod.image[0]}" alt=""></li>
                    <li><img class="thumImg" onclick="changeImg('${prod.image[1]}')" src="${prod.image[1]}" alt=""></li>
                    <li><img class="thumImg" onclick="changeImg('${prod.image[2]}')" src="${prod.image[2]}" alt=""></li>
                    <li><img class="thumImg" onclick="changeImg('${prod.image[3]}')" src="${prod.image[3]}" alt=""></li>
                    <li><img class="thumImg" onclick="changeImg('${prod.image[4]}')" src="${prod.image[4]}" alt=""></li>
                    <li><img class="thumImg" onclick="changeImg('${prod.image[5]}')" src="${prod.image[5]}" alt=""></li>
                </ul>
            </div>`;
            document.getElementById('prod-img').innerHTML = prodImg;
            prod.image.map((data)=>{
                sliderImg += `<div class="mySlides fade">
                    <img src="${data}" style="width:100%">
                    </div>`;
            });
            sliderImg += `<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>`;
            document.getElementById('slide-img').innerHTML = sliderImg;   
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
    document.getElementById('poster-container').innerHTML = relatedItems;
}

function loadProduct() {
    let url = (window.location.href).replaceAll('%20', ' ');;
    let prodDetails = url.split('?');
    let prod = prodDetails[1].split('&');
    let cat = prod[0].split('=')[1];
    let id = prod[1].split('=')[1];
    let brandName = prod[2].split('=')[1];
    let desc = prod[3].split('=')[1];

    fetchedProducts(id, cat, brandName, desc);
}

function changeImg(img) {
    let mainImg = document.getElementById('main-image');
    mainImg.innerHTML = `<img id="big-image" onmouseout="bigImage()" onmouseover="largeImage()" src="${img}" alt=""></img>`;
}

function bigImage() {
    document.getElementsByClassName('img-zoom-result')[0].style.display = 'none';
}

function largeImage() {
    document.getElementsByClassName('img-zoom-result')[0].style.display = 'block';
    imageZoom("big-image", "myresult");
}

function imageZoom(imgID, resultID) {
    let img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    img.parentElement.insertBefore(lens, img);
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";

    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);

    function moveLens(e) {
        let pos, x, y;
        e.preventDefault();
        pos = getCursorPos(e);
        x = pos.x - (lens.offsetWidth / 2);
        y = pos.y - (lens.offsetHeight / 2);
        if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
        if (x < 0) { x = 0; }
        if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
        if (y < 0) { y = 0; }
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }


    function getCursorPos(e) {
        let a, x = 0, y = 0;
        e = e || window.event;
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}

loadProduct();

// Slider JS

const debounce = (func, delay) => {
    let debounceTimer;
    return function() {
        const context = this
        const args = arguments
            clearTimeout(debounceTimer)
                debounceTimer
            = setTimeout(() => func.apply(context, args), delay)
    }
}

window.addEventListener('resize', debounce(reportWindowSize, 100));
document.getElementById('img-slider').style.display = 'none';

function reportWindowSize(){
    if (this.innerWidth <= 1200) {
        document.getElementById('img-slider').style.display = 'block';
        document.getElementById('prod-img').style.display = 'none';
    }else{
        document.getElementById('img-slider').style.display = 'none';
        document.getElementById('prod-img').style.display = 'block';
    }
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
//   dots[slideIndex-1].className += " active";
}