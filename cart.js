let cartItems = JSON.parse(localStorage.getItem('cartItems'));

function displayCart(cartItems) {
    let finalCart = '';
    cartItems.map((cart, cartIndex) => {
        finalCart += `<div class="cart-card">
                <img class="cart-img" alt="" src="${cart.img}">
                <div id="cart-product-details" class="cart-product-details">
                    <h3 class="cart-product-brand">${cart.name}</h3>
                    <p class="cart-product-desc">${cart.desc}</p>
                    <select name="" id="" onchange="quantity(this.value,'${cart.price}','${cart.id}')" style="outline:none;border-radius:2px;background:#f5f5f6;border:none;text-align:Center;color:black;">
                        <option value="1" ${cart.qty ==1 ? 'selected' : ''}>Qty:1</option>
                        <option value="2" ${cart.qty ==2 ? 'selected' : ''}>Qty:2</option>
                        <option value="3" ${cart.qty ==3 ? 'selected' : ''}>Qty:3</option>
                        <option value="4" ${cart.qty ==4 ? 'selected' : ''}>Qty:4</option>
                        <option value="5" ${cart.qty ==5 ? 'selected' : ''}>Qty:5</option>
                    </select>

                    <div style="margin-top:55px;">
                        <span id="${cartIndex}" class="removeItem" onclick=removeItem(this.id)>REMOVE</span>
                    </div>
                    </div>
                <div class="cart-product-price">
                    <p id="${cart.id}">${cart.price}</p>
                </div>
            </div>`;
        displayPrice(cart.price);
    });
    document.getElementById('cart-products').innerHTML = finalCart;
}

function displayPrice(totalPrice) {
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

    document.getElementById('cart-total').innerHTML = cartPrice;
}

function quantity(qty, price, id) {
    let productPrice = parseInt(price.slice(3));
    let finalPrice = productPrice * qty;
    document.getElementById(id).innerHTML = `Rs.${finalPrice}`;
    cartItems.map((data) => {
        if (data.id === id) {
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
    cartItems.splice(id, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    location.reload();
}

if (cartItems.length != 0)
    displayCart(cartItems);
else
    document.getElementById('empty-cart').innerText = "No Items in the cart,please add some items!!!";

let modal = document.getElementById('modal');
let cartBtn = document.getElementById('cartBtn');
let closeBtn = document.getElementById('closeBtn');

cartBtn.addEventListener('click', ()=>{
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', ()=>{
    modal.style.display = 'none';
});
