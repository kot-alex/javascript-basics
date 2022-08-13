'use strict'

const board = document.querySelector('#board');

board.insertAdjacentHTML('afterbegin', '<div class="letters" style="display:flex"></div>');
const abc = 'ABCDEFGH'.split('').reverse();
for (let i = 0; i < 9; i++) {
    document.querySelector('.letters').insertAdjacentHTML('afterbegin', '<div class="letter square"></div>');
    document.querySelector('.letter').textContent = abc[i];
}

document.querySelector('.letters').insertAdjacentHTML('afterend', '<div class="middle" style="display:flex" ></div>');

document.querySelector('.middle').insertAdjacentHTML('afterbegin', '<div class="numbers"></div>');
for (let i = 1; i < 9; i++) {
    document.querySelector('.numbers').insertAdjacentHTML('beforeend', '<div class="number square"></div>');
    document.querySelectorAll('.number').item(i - 1).textContent = i;
}

let changeColor = true;
for (let i = 0; i < 8; i++) {
    const column = document.createElement('div');
    document.querySelector('.middle').appendChild(column);
    column.classList.add('column');
    column.style.flexDirection = i % 2 === 0 ? 'column' : 'column-reverse';
    for (let j = 0; j < 8; j++) {
        const square = document.createElement('div');
        column.appendChild(square);
        square.className = 'square';
        square.classList.toggle('black', true);
        if (changeColor) {
            square.classList.toggle('black', false);
            square.classList.toggle('white', true);
            changeColor = false;
        } else {
            changeColor = true;
        }
    }
}

document.querySelector('.middle').appendChild(document.querySelector('.numbers').cloneNode(true));
board.appendChild(document.querySelector('.letters').cloneNode(true));