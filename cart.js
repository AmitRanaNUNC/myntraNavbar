let cartArray = [];

function productCart(img, name, desc, price) {
    let productAdded = {
        'img': img,
        'name': name,
        'desc': desc,
        'price': price
    };
    cartArray.push(productAdded);
    displayCart(cartArray);
}

function displayCart(cart) {
    let finalCart = '';
    cart.map((data) => {
        finalCart += `<div class="cart-card">
                <img class="cart-img" alt="">
                <div id="product-details" class="product-details">
                    <h3 class="product-brand">${data.name}</h3>
                    <p class="product-desc">${data.desc}</p>
                    <select name="" id="">
                        <option value="">Qty</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div class="product-price">
                    <p>${data.price}</p>
                </div>
            </div>`;
    });

    document.getElementById('cart-products').innerHTML = finalCart;


}