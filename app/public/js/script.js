'use strict'


let menuBtn = document.querySelector('#menuBtn');
let menu = document.querySelector('#menu');
let ulMenu = document.querySelector('#ulMenu');
let mainPage = document.querySelector('#mainPage');


console.log(menu)

if(window.innerWidth < 991.98) {
  menu.classList.add('activeM');
  ulMenu.classList.add('Dnone');

}

menuBtn.addEventListener('click', (e) => {
  console.log('window.innerWidth',)

  if (window.innerWidth > 991.98) {
    menu.classList.toggle('activeM');
    mainPage.classList.toggle('mainPage');
    ulMenu.classList.toggle('Dnone');
  } else {

    menu.classList.toggle('activeM');
    mainPage.classList.toggle('mainPage');
    ulMenu.classList.toggle('Dnone');
  }

})



