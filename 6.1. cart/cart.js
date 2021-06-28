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

function countCartQuantity(arrOfItems) {
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

function cartState() {
    const state = document.querySelector('#cart');
    if (cart.length > 0) {
        let textForm;
        switch (countCartQuantity(cart)) {
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
        state.textContent = 'В корзине: ' + countCartQuantity(cart) + ' ' + textForm + ' на сумму ' + countBasketPrice(cart);
    } else {
        state.textContent = 'Корзина пуста';
    }
}

function addToCart(itemIndex) {
    cart.push(itemsInCatalog[itemIndex]);
}

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
    type: 'Coat',
    image: 'img/product-5.jpg'
}, {
    type: 'Jeans',
    image: 'img/product-6.jpg'
}, {
    type: 'T-shirt',
    image: 'img/product-7.jpg'
}, {
    type: 'Shirt',
    image: 'img/product-8.jpg'
}];
for (let i = 0; i < 8; i++) {
    itemsInCatalog.push(getItem(typeAndImage));
}

cartState();

const catalog = document.querySelector('#catalog');

for (let i = 0; i < itemsInCatalog.length; i++) {
    catalog.insertAdjacentHTML('afterbegin', '<div class="product"></div>');

    const type = document.createElement('h3');
    type.textContent = itemsInCatalog[i]['type'];
    document.querySelector('.product').appendChild(type);

    const image = document.createElement('img');
    image.classList.add('image');
    image.src = itemsInCatalog[i]['image'];
    document.querySelector('.product').appendChild(image);

    const price = document.createElement('span');
    price.textContent = itemsInCatalog[i]['price'];
    document.querySelector('.product').appendChild(price);

    const addButton = document.createElement('button');
    addButton.textContent = 'Buy';
    addButton.setAttribute('data-item-index', i);
    // addButton.addEventListener('click', function () {
    //     cart.push(itemsInCatalog[i]);
    //     cartState();
    // });
    document.querySelector('.product').appendChild(addButton);
}

catalog.addEventListener('click', function (e) {
    addToCart(e.target.getAttribute('data-item-index'));
    cartState();
});