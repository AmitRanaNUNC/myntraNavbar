let menSection = {
    "Topwear": ["T-Shirts", "Casual shirts", "Formal Shirts", "Sweaters", "Jackets", "Blazers & Coats", "Suits", "Rain Jackets"],
    "Indian & Festive Wear": ["Kurtas & Kurta Sets", "Sherwanis", "Nehru Jackets", "Dhotis"],
    "Bottomwear": ["Jeans", "Casual Trousers", "Formal Trousers", "Shorts", "Track Pants & Joggers"],
    "Innerwear & Sleepwear": ["Briefs & Trunks", "Boxers", "Vests", "Sleepwear & Longwear", "Thermals"],
    "Plus Size": "",
    "Footwear": ["Casual Shoes", "Sports Shoes", "Formal Shoes", "Sneakers", "Sandals & Floaters", "Flip Flop", "Socks"],
    "Personal Care & Grooming": "",
    "Sunglasses & Frames": "",
    "Watches": "",
    "Sports & Active Wear": ["Sports Shoes", "Sports Sandals", "Active T-Shirts", "Track Pants & Shorts", "Tracksuits", "Jackets & Sweatshirts", "Sports Accessories", "Swimwear"],
    "Gadgets": ["Smart Wearables", "Fitness Gadgets", "Headphones", "Speakers"],
    "Fashion Accessories": ["Wallets", "Belts", "Perfunes & Body Mist", "Trimmers", "Deodorants", "Ties,Cuffflinks & Pocket Squares", "Accessory Gift Sets", "Caps & Hats", "Mufflers,Scarves & Gloves", "Phone Cases", "Rings & Wristwear", "Helmets"],
    "Bags & Bagpacks": "",
    "Luggages & Trolleys": ""
}

let womenSection = {
    "Indian & Fusion Wear": ["Kurtas & Suits", "Kurtis, Tunics & Tops", "Ethnic Wear", "Leggings, Salwars & Churidars", "Skirts & Palazzos", "Sarees Dress Materials", "Lehenga Cholis", "Dupattas & Shawls", "Jackets"],
    "Western Wear": ["Dresses", "Jumpsuits", "Tops", "Jeans", "Trousers & Capris", "Shorts & Skirts", "Shrugs", "Sweaters & Sweatshirts", "Jackets & Coats", "Blazers & Waistcoats"],
    "Plus Size": "",
    "Sunglasses & Frames": "",
    "Footwear": ["Flats", "Casual Shoes", "Heels", "Boots", "Sports Shoes & Floaters"],
    "Sports & Active Wear": ["Clothing", "Footwear", "Sports Accessories", "Sports Equipment"],
    "Belts, Scarves & More": "",
    "Watches & Wearables": "",
    "Lingerie & Sleepwear": ["Bra", "Briefs", "Shapewear", "Sleepwear & Loungewear", "Swimwear", "Camisoles & Thermals"],
    "Beauty & Personal Care": ["Makeup", "Skincare", "Premium Beauty", "Lipsticks", "Fragrances"],
    "Gadgets": ["Smart Wearables", "Fitness Gadgets", "Headphones", "Speakers"],
    "Jewellery": ["Fashion Jewellery", "Fine Jewellery", "Earrings"],
    "Backpacks": "",
    "Handbags, Bags & Wallets": "",
    "Luggages & Trolleys": ""
}

let kidsSection = {
    "Boys Clothing": ["T-Shirts", "Shirts", "Shorts", "Jeans", "Trousers", "Clothing Sets", "Ethnic Wear", "Track Pants & Pyjamas", "Jacket, Sweater & Sweatshirts", "Innerwear & Sleepwear"],
    "Girls Clothing": ["Dresses", "Tops", "Tshirts", "Clothing Sets", "Ethnic wear", "Dungarees & Jumpsuits", "Skirts & shorts", "Tights & Leggings", "Jeans, Trousers & Capris", "Jacket, Sweater & Sweatshirts", "Innerwear & Sleepwear"],
    "Boys Footwear": ["Casual Shoes", "Sports Shoes", "Sandals", "Flip flops", "School Shoes"],
    "Girls Footwear": ["Flats", "Casual Shoes", "Sports Shoes", "Heels", "Flip flops", "Sandals", "School Shoes"],
    "Infants": ["Rompers & Onesies", "Clothing Sets", "Tshirts & Tops", "Dresses", "Bottom wear", "Winter Wear", "Innerwear & Sleepwear", "Infants Accessories"],
    "Kids Accessories": ["Bags & Backpacks", "Watches", "Jewellery & Hair Accessories", "Eyewear"]
}

let homeAndLivingSection = {
    "Bed Linen & Furnishing": ["Bedsheets", "Bedding Sets", "Blankets, Quilts & Dohars", "Pillows & Pillow Covers", "Bed Covers"],
    "Flooring": ["Carpets", "Floor Mats & Dhurries", "Door Mats"],
    "Bath": ["Bath Towels", "Hand & Face Towels", "Beach Towels", "Towels Set", "Bath Rugs", "Bath Robes", "Bathroom Accessories"],
    "Lamps & Lighting": ["Floor Lamps", "Table Lamps", "Wall Lamps"],
    "Home Décor": ["Plants & Planters", "Aromas & Candles", "Clocks", "Mirrors", "Wall Décor", "Wall Shelves", "Fountains", "Showpieces & Vases", "Cushions & Cushion Covers", "Curtains"],
}

let offersSection = {
    "Kurtas & Kurta Sets At Flat 60% Off": "",
    "Shoes At Min 50%": "",
    "T-Shirts At Min 50%": "",
    "Jeans At Min 50%": "",
    "Heels & Flats Under 999": "",
    "Shirts At Min 50%": "",
    "Jeans At Min 50%": "",
    "Tops At Min 60%": "",
    "Dresses Under 1299": ""
}

const navItems = document.getElementsByClassName("nav-items");
document.getElementById("item-box").addEventListener("mouseover", visibile);
document.getElementById("item-box").addEventListener("mouseout", hidden);

// [...navItems].map((navlink,index)=>{
//     navlink.addEventListener("mouseover", visibile);
//     navlink.addEventListener("mouseout", hidden);
// })


for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("mouseover", visibile);
    navItems[i].addEventListener("mouseout", hidden);
}

function parsingItems(itemName) {
    const menJsonData = Object.keys(menSection);
    if (itemName == 'men') {
        let htmz = "";
        for (let i = 0; i < menJsonData.length; i++) {
            // htmz += "<ul class='items'>";
            if (i % 2 != 0)
                htmz += "<ul class='items items-even'>";
            else
                htmz += "<ul class='items items-odd'>";
            htmz += "<li class='item-category' style='color:#ee5f73'>" + menJsonData[i] + "</li>";
            htmz += "<ul class='item-sub-category'>";
            for (let j = 0; j < menSection[menJsonData[i]].length; j++) {
                htmz += "<li><a href=''>" + menSection[menJsonData[i]][j] + "</a></li>";
            }
            htmz += "<hr class='hr-line'>";
            htmz += "</ul>";
            htmz += "</ul>";
        }
        document.getElementById("items-data").innerHTML = htmz;
    } else if (itemName == 'women') {
        const womenJsonData = Object.keys(womenSection);
        let htmz = "";
        for (let i = 0; i < womenJsonData.length; i++) {
            // htmz += "<ul class='items'>"; 
            if (i % 2 != 0)
                htmz += "<ul class='items items-even'>";
            else
                htmz += "<ul class='items items-odd'>";
            htmz += "<li class='item-category' style='color:#fb56c1'>" + womenJsonData[i] + "</li>";
            htmz += "<ul class='item-sub-category'>";
            for (let j = 0; j < womenSection[womenJsonData[i]].length; j++) {
                htmz += "<li><a href=''>" + womenSection[womenJsonData[i]][j] + "</a></li>";
            }
            htmz += "<hr class='hr-line'>";
            htmz += "</ul>";
            htmz += "</ul>";
        }
        document.getElementById("items-data").innerHTML = htmz;
    } else if (itemName == 'kids') {
        const kidsJsonData = Object.keys(kidsSection);
        let htmz = "";
        for (let i = 0; i < kidsJsonData.length; i++) {
            // htmz += "<ul class='items'>";
            if (i % 2 == 0)
                htmz += "<ul class='items-even items'>";
            else
                htmz += "<ul class='items-odd items'>";
            htmz += "<li class='item-category' style='color:#f26a10'>" + kidsJsonData[i] + "</li>";
            htmz += "<ul class='item-sub-category'>";
            for (let j = 0; j < kidsSection[kidsJsonData[i]].length; j++) {
                htmz += "<li><a href=''>" + kidsSection[kidsJsonData[i]][j] + "</a></li>";
            }
            htmz += "<hr class='hr-line'>";
            htmz += "</ul>";
            htmz += "</ul>";
        }
        document.getElementById("items-data").innerHTML = htmz;
    } else if (itemName == 'homeandliving') {
        const homeAndLivingJsonData = Object.keys(homeAndLivingSection);
        let htmz = "";
        for (let i = 0; i < homeAndLivingJsonData.length; i++) {
            // htmz += "<ul class='items'>";
            if (i % 2 == 0)
                htmz += "<ul class='items-even items'>";
            else
                htmz += "<ul class='items-odd items'>";
            htmz += "<li class='item-category' style='color:#f26a10'>" + homeAndLivingJsonData[i] + "</li>";
            htmz += "<ul class='item-sub-category'>";
            for (let j = 0; j < homeAndLivingSection[homeAndLivingJsonData[i]].length; j++) {
                htmz += "<li><a href=''>" + homeAndLivingSection[homeAndLivingJsonData[i]][j] + "</a></li>";
            }
            htmz += "<hr class='hr-line'>";
            htmz += "</ul>";
            htmz += "</ul>";
        }
        document.getElementById("items-data").innerHTML = htmz;
    }
    else if (itemName == 'offers') {
        const offersJsonData = Object.keys(offersSection);
        let htmz = "";
        for (let i = 0; i < offersJsonData.length; i++) {
            // htmz += "<ul class='items'>";
            if (i % 2 == 0)
                htmz += "<ul class='items-even items'>";
            else
                htmz += "<ul class='items-odd items'>";
            htmz += "<li class='item-category' style='color:#f26a10'>" + offersJsonData[i] + "</li>";
            htmz += "<ul class='item-sub-category'>";
            for (let j = 0; j < offersSection[offersJsonData[i]].length; j++) {
                htmz += "<li><a href=''>" + offersSection[offersJsonData[i]][j] + "</a></li>";
            }
            htmz += "<hr class='hr-line'>";
            htmz += "</ul>";
            htmz += "</ul>";
        }
        document.getElementById("items-data").innerHTML = htmz;
    }
}

function visibile(event) {
    let show = 'visibility:visible;opacity:1;transition: all .6s ease-out;'
    parsingItems(event.target.dataset.value);
    if (event.target.dataset.value == 'men')
        this.style.borderBottomColor = '#ee5f73';
    else if (event.target.dataset.value == 'women')
        this.style.borderBottomColor = '#fb56c1';
    else if (event.target.dataset.value == 'kids')
        this.style.borderBottomColor = '#f26a10';
    else if (event.target.dataset.value == 'homeandliving')
        this.style.borderBottomColor = '#f2c210';
    else if (event.target.dataset.value == 'offers')
        this.style.borderBottomColor = '#0db7af';

    // document.getElementById("item-box").style.visibility ='visible';
    document.getElementById("item-box").style.cssText = show;
    document.getElementById("background-fade").style.visibility = 'visible';
}
function hidden() {
    let hide = 'visibility:hidden;opacity:0;transition: all .5s ease-out;';
    document.getElementById("item-box").style.cssText = hide;
    document.getElementById("background-fade").style.visibility = 'hidden';
}