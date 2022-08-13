'use strict'

function Item(type, price, quantity) {
    this.type = type;
    this.price = price;
    this.quantity = quantity;
}

function randomType(arrOfTypes) {
    for (let i = 0; i < arrOfTypes.length; i++) {
        let type = arrOfTypes[Math.floor(Math.random() * arrOfTypes.length)];
        let index = arrOfTypes.indexOf(type);
        arrOfTypes.splice(index, 1);
        return type;
    }
}

function getItem(type) {
    let itemType = type;
    let itemPrice = Math.floor(Math.random() * 20) * 10 + 20;
    let itemQuantity = Math.floor(Math.random() * 2 + 1);
    return new Item(itemType, itemPrice, itemQuantity);
}

function countQuantity(arrOfItems) {
    let qty = 0;
    for (let item of arrOfItems) {
        qty += item.quantity;
    }
    return qty;
}

function countBasketPrice(arrOfItems) {
    let sum = 0;
    for (let item of arrOfItems) {
        sum += item.price * item.quantity;
    }
    return sum;
}

const cart = [];
const types = ['Trousers', 'T-shirt', 'Sweater', 'Jeans', 'Shoes', 'Shorts', 'Suit', 'Jacket'];
for (let i = 0; i < 8; i++) {
    cart.push(getItem(randomType(types)));
}

const cartState = document.querySelector('#cart');
if (cart.length > 0) {
    let textForm;
    switch (countQuantity(cart)) {
        case 1:
            textForm = 'товар';
            break;
        case 2:
        case 3:
        case 4:
            textForm = 'товара';
            break;
        default:
            textForm = 'товаров';
    }
    cartState.textContent = 'В корзине: ' + countQuantity(cart) + ' ' + textForm + ' на сумму ' + countBasketPrice(cart);
} else {
    cartState.textContent = 'Корзина пуста';
}

const catalog = document.querySelector('#catalog');
for (let i = 0; i < cart.length; i++) {
    catalog.insertAdjacentHTML('afterbegin', '<div class="product" ></div>');

    const type = document.createElement('h3');
    document.querySelector('.product').appendChild(type);
    type.textContent = cart[i]['type'];

    const image = document.createElement('img');
    document.querySelector('.product').appendChild(image);
    image.classList.add('image');
    image.setAttribute('src', 'https://picsum.photos/300/400');

    const price = document.createElement('span');
    document.querySelector('.product').appendChild(price);
    price.textContent = cart[i]['price'];
}