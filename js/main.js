'use strict';
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');


const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");

}
buttonAuth.addEventListener("click", toggleModalAuth);
closeAuth.addEventListener("click" , toggleModalAuth);


cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");

}
//console.dir(modalAuth);
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
let login = localStorage.getItem('delivery'); // получаем данные которые пришли в переменную логин

//new
const cardsRestaurants = document.querySelector('.cards-restaurants');
// получаем промо
const containerPromo = document.querySelector('.container-promo');
// получаем блок с рестораниами чтобы скрыть его
const restaurants = document.querySelector('.restaurants');
// получаем блок с товарами чтобы показывать их при клике
const menu = document.querySelector('.menu');
// получаем лого чтобы при клике вернуться к главной странице
const logo = document.querySelector('.logo');
// single card
const cardsMenu = document.querySelector('.cards-menu');


//пишем функцию, которая будет работать с базой данных сразу после переменных
//такую функцию можно вызвать после ее объявления
const getData = async function(url){
    // выполнение не начнется пока await не выполнится
    const response = await fetch(url);
    //fetch запрашивает данные promise(обещание)
    if(!response.ok){
        //сбросим ошибку
        throw new Error(`Error adress ${url}, статус
        ${response.status} !`)
    }
    //console.log(response.json());
     return await response.json();
};

getData('./db/partners.json');



function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
    if(modalAuth.classList.contains("is-open")){
        disableScroll();
    }else{
        enableScroll();
    }
  loginInput.style.borderColor = '';
}


function authorized() {
  console.log(login);
  userName.textContent = login;
  buttonAuth.style.display='none';
  buttonOut.style.display = 'block';
  userName.style.display = 'inline';

  buttonOut.addEventListener('click' , logOut);
  function logOut(){
   login = null;
    localStorage.removeItem('delivery'); //очищаем данные которые записались в локал стораж
    buttonAuth.style.display='';
    buttonOut.style.display = '';
    userName.style.display = '';
    buttonOut.removeEventListener('click' , logOut);
    checkAuth();
  }
}

function notAuthorized() {
  console.log('not');
  function logIn(event){
    event.preventDefault();// сьрос перезагрузки страницы
     // console.log(loginInput.value);
    if (login = loginInput.value.trim()) {
      toggleModalAuth();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit',logIn);
      logInForm.reset();//очищаем поля ввода
      checkAuth();
    }else{
       loginInput.style.borderColor = '#ff0000';
        loginInput.value = '';
    }
localStorage.setItem('delivery' , login);//записываем объект который вошел
  }
  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit',logIn);
}
function checkAuth() {
  if (login){
    authorized();
  }else{
    notAuthorized();

  }
}

checkAuth();

//Закрытие модального окна по клику на пустое место

modalAuth.addEventListener('click' , function(event) {
  //console.log(event.target);
  if(event.target.classList.contains('is-open')){
    toggleModalAuth();
  }
});

//new
function createCardsRestaurants(restaurant){

    const {
        image,
        kitchen,
        name,
        price,
        stars,
        products,
        time_of_delivery : timeOfDelivery
    } = restaurant;

    const card = `

<a class="card card-restaurant" data-products="${products}">
 <img src="${image}" alt="image" class="card-image"/>
   <div class="card-text">
     <div class="card-heading">
       <h3 class="card-title">${name}</h3>
       <span class="card-tag tag">${timeOfDelivery} min</span>
     </div>
 
    <div class="card-info">
      <div class="rating">
              ${stars}
      </div>
      <div class="price">${price}</div>
       <div class="category">${kitchen}</div>
     </div>
 
   </div>
 
 </a>`;

    cardsRestaurants.insertAdjacentHTML('beforeend',card);
    //afterbegin - внутрь и в начало
    //убираем а href
}
// createCardsRestaurants();
// createCardsRestaurants();
// createCardsRestaurants();

// функция для вывова синг карточки товара
function createCardGood(goods){

    const {
        description,
        id,
        image,
        name,
        price
    } = goods;
    const card = document.createElement('div');
    card.className = 'card';
    card.insertAdjacentHTML('beforeend', `
    
        <img src="${image}" alt="image" class="card-image"/>
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title card-title-reg">${name}</h3>
            </div>

        <div class="card-info">
            <div class="ingredients">
            ${description}
            </div>
        </div>
        <div class="card-buttons">
            <button class="button button-primary button-add-cart">
                <span class="button-card-text">В корзину</span>
                <span class="button-cart-svg"></span>
            </button>
            <strong class="card-price-bold">${price}</strong>
        </div>
       </div>
  
    `);

   // console.log(card);
    cardsMenu.insertAdjacentElement('beforeend' , card);

}

function openGoods(event){
    //console.log(event);
    //объект event создается во время события
   const target = event.target;
   //определяем по какой карточке кликнули
   const restaurant = target.closest('.card-restaurant');
   // при клике на любое место получаем именно родителя
// после клика нам нужно скрывать все остальные карточки товара и промо
    if(restaurant){
        //console.log(restaurant.dataset.products);
        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');
        cardsMenu.textContent = '';

        getData(`./db/${restaurant.dataset.products}`).then(function(data){
            data.forEach(createCardGood);
        });

    }

}


function init(){
    //с помощью then обрабатываем промисы
    getData('./db/partners.json').then(function(data){
        data.forEach(createCardsRestaurants)
    });
    cardsRestaurants.addEventListener('click' , openGoods);
    logo.addEventListener('click' , function(){
        containerPromo.classList.remove('hide')
        restaurants.classList.remove('hide')
        menu.classList.add('hide')
    });
}
init();