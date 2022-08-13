'use strict'

function showGallery() {
    for (let i = 0; i < images.length; i++) {
        gallery.insertAdjacentHTML('beforeend', `<div data-row='${i}' class='row'></div>`);
        for (let j = 0; j < images[i].length; j++) {
            document.querySelector(`[data-row='${i}']`).insertAdjacentHTML('beforeend', `<img data-image='${i}${j}' src='${images[i][j]}' class='gallery-image'></img>`);
        }
    }
}

function getImageRow(slideNumber) {
    let rowNumber = (slideNumber + '')[0];
    let row = images[rowNumber];
    let slideInRow = Number((slideNumber + '')[1]);
    for (let i = 0; i < row.length; i++) {
        document.querySelector('#slide').insertAdjacentHTML('beforeend', `<img data-slide='${i}' src='${row[i]}' class='slider-image'></img>`);
        if (slideInRow == document.querySelector(`[data-slide='${i}']`).getAttribute('data-slide')) {
            document.querySelector(`[data-slide='${i}']`).style.display = 'block';
        }
    }

    let rowImage = document.querySelectorAll('.slider-image');

    function nxtSlide() {
        rowImage[slideInRow].style.display = 'none';
        slideInRow = (slideInRow === rowImage.length - 1) ? 0 : slideInRow + 1;
        rowImage[slideInRow].style.display = 'block';
    }

    function prvSlide() {
        rowImage[slideInRow].style.display = 'none';
        slideInRow = (slideInRow === 0) ? rowImage.length - 1 : slideInRow - 1;
        rowImage[slideInRow].style.display = 'block';
    }

    document.querySelector('#nxt').addEventListener('click', nxtSlide);
    document.querySelector('#prv').addEventListener('click', prvSlide);
}

function showPopup(slideNumber) {
    popup.firstChild.remove();
    const htmlSlider = `<div id='slider'>
    <button id='prv'><</button>
    <div id='slide'></div>
    <button id='nxt'>></button>
</div>`
    popup.insertAdjacentHTML('afterbegin', htmlSlider);
    getImageRow(slideNumber);
    popup.style.display = 'block';
}

function closePopup() {
    popup.style.display = 'none';
}

const images = [
    ['img/slide-1.jpg', 'img/slide-2.jpg', 'img/slide-3.jpg'],
    ['img/slide-3.jpg', 'img/slide-1.jpg', 'img/slide-2.jpg'],
    ['img/slide-2.jpg', 'img/slide-3.jpg', 'img/slide-1.jpg'],
    ['img/slide-3.jpg', 'img/slide-1.jpg', 'img/slide-2.jpg']
];

const gallery = document.querySelector('#gallery');
const popup = document.querySelector('#popup');
const closeBtn = document.querySelector('#closePopup');

showGallery();

const rows = document.querySelectorAll('.row');

for (let i = 0; i < rows.length; i++) {
    rows[i].addEventListener('click', function (e) {
        showPopup(e.target.getAttribute('data-image'));
    });
}

closeBtn.addEventListener('click', closePopup);