'use strict'

function Item(type, image, price, quantity) {
    this.type = type;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
}

function getItem(arrOfTypesAndImages) {
    for (let i = 0; i < arrOfTypesAndImages.length; i++) {
        let itemQuantity = 1;
        let itemPrice = Math.floor(Math.random() * 20) * 10 + 20;
        let itemTaI = arrOfTypesAndImages[Math.floor(Math.random() * arrOfTypesAndImages.length)];
        let index = arrOfTypesAndImages.indexOf(itemTaI);
        arrOfTypesAndImages.splice(index, 1);
        return new Item(itemTaI.type, itemTaI.image, itemPrice, itemQuantity);
    }
}

function countBasketPrice(arrOfItems) {
    let sum = 0;
    for (let item of arrOfItems) {
        sum += item.price * item.quantity;
    }
    return sum;
}

function countCartQuantity(arrOfItems) {
    let qty = 0;
    for (let item of arrOfItems) {
        qty += item.quantity;
    }
    return qty;
}

function textForm(num) {
    num = num % 100;
    if (num >= 5 && num <= 20) {
        return 'товаров';
    }
    num = num % 10;
    if (num === 1) {
        return 'товар';
    }
    if (num >= 2 && num <= 4) {
        return 'товара';
    }
    return 'товаров';
}

function cartState() {
    if (cart.length > 0) {
        $cart.textContent = 'В корзине: ' + countCartQuantity(cart) + ' ' + textForm(countCartQuantity(cart)) + ' на сумму ' + countBasketPrice(cart);
    } else {
        $cart.textContent = 'Корзина пуста';
    }

    $itemsList.textContent = '';
    for (const [index, item] of cart.entries()) {
        const cartHtml = `<div class='cart-item'><h3>${item.type}</h3><p class='price'>Price: ${item.price}</p><button class='del-btn' data-item-index="${index}">Remove</button></div>`;
        $itemsList.insertAdjacentHTML('beforeend', cartHtml);
    }
}

function addToCart(itemIndex) {
    cart.push(itemsInCatalog[itemIndex]);
}

function removeFromCart(itemIndex) {
    cart.splice(itemIndex, 1);
    $popup.querySelector(`[data-item-index='${itemIndex}']`).parentElement.remove();
}

function showCart() {
    $popup.style.display = 'block';
}

function closeCart() {
    $popup.style.display = 'none';
}

function nextSection() {
    $popup.querySelector('#section-' + currentSection).style.display = 'none';
    currentSection = currentSection < 3 ? currentSection + 1 : 1;
    $popup.querySelector('#section-' + currentSection).style.display = 'block';
}

let currentSection = 1;
const cart = [];
const itemsInCatalog = [];
const typeAndImage = [{
    type: 'Jacket',
    image: 'img/product-1.jpg'
}, {
    type: 'Suit',
    image: 'img/product-2.jpg'
}, {
    type: 'Shorts',
    image: 'img/product-3.jpg'
}, {
    type: 'Trousers',
    image: 'img/product-4.jpg'
}, {
    type: 'T-shirt',
    image: 'img/product-5.jpg'
}, {
    type: 'Shirt',
    image: 'img/product-6.jpg'
}];

const $catalog = document.querySelector('#catalog');
const $cart = document.querySelector('#cart');
const $popup = document.querySelector('#popup');
const $closeBtn = document.querySelector('#close-btn');
const $nextBtn = document.querySelector('#next-btn')
const $itemsList = document.querySelector('#items-list');

cartState();

for (let i = 0; i < 6; i++) {
    itemsInCatalog.push(getItem(typeAndImage));
}

for (let i = 0; i < itemsInCatalog.length; i++) {
    $catalog.insertAdjacentHTML('afterbegin', '<div class="product"></div>');

    const $type = document.createElement('h3');
    $type.textContent = itemsInCatalog[i]['type'];
    document.querySelector('.product').appendChild($type);

    const $image = document.createElement('img');
    $image.classList.add('image');
    $image.src = itemsInCatalog[i]['image'];
    document.querySelector('.product').appendChild($image);

    const $price = document.createElement('span');
    $price.textContent = 'Price: ' + itemsInCatalog[i]['price'];
    document.querySelector('.product').appendChild($price);

    const $addButton = document.createElement('button');
    $addButton.textContent = 'Add to Cart';
    $addButton.setAttribute('data-item-index', i);
    $addButton.classList.add('add-btn');
    document.querySelector('.product').appendChild($addButton);
}

$catalog.addEventListener('click', function (e) {
    if (e.target.classList == 'add-btn') {
        addToCart(e.target.getAttribute('data-item-index'));
        cartState();
    }
});

$itemsList.addEventListener('click', function (e) {
    if (e.target.classList == 'del-btn') {
        removeFromCart(e.target.getAttribute('data-item-index'));
        cartState();
    }
});

$cart.addEventListener('click', showCart);

$closeBtn.addEventListener('click', closeCart);

$nextBtn.addEventListener('click', nextSection);