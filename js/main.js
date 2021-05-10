'use strict';
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
let login = localStorage.getItem('delivery'); // получаем данные которые пришли в переменную логин
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
const modalBody = document.querySelector('.mm');
const modalPrice = document.querySelector('.modal-pricetag')
const buttonClearCart = document.querySelector('.clear-cart');

const cart = [];



function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");

}
function toggleModal() {
    modal.classList.toggle("is-open");


}
buttonAuth.addEventListener("click", toggleModalAuth);
closeAuth.addEventListener("click" , toggleModalAuth);




close.addEventListener("click", toggleModal);


//console.dir(modalAuth);



//пишем функцию, которая будет работать с базой данных сразу после переменных
//такую функцию можно вызвать после ее объявления
const getData = async function(url){
    // await говорит о том, что выполнение следующей строки не начнется пока эта не выполнится
    const response = await fetch(url);
    //fetch запрашивает данные на сервер promise(обещание)
    if(!response.ok){
        //throw сбросим ошибку
        throw new Error(`Error adress ${url}, статус
        ${response.status} !`)
    }
    //console.log(response.json());
     return await response.json();
    //данные появляются после выполнения метода json
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
  buttonOut.style.display = 'flex';
  userName.style.display = 'inline';
  cartButton.style.display = 'flex';

  buttonOut.addEventListener('click' , logOut);
  function logOut(){
   login = null;
    localStorage.removeItem('delivery'); //очищаем данные которые записались в локал стораж
    buttonAuth.style.display='';
    buttonOut.style.display = '';
    userName.style.display = '';
    cartButton.style.display = '';
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
            <button class="button button-primary button-add-cart" id="${id}">
                <span class="button-card-text">В корзину</span>
                <span class="button-cart-svg"></span>
            </button>
            <strong class="card-price card-price-bold">${price}</strong>
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
//добавляем товар в корзину
function addToCart(event){
    const target = event.target;
    const buttonAddToCart = target.closest('.button-add-cart');
    if(buttonAddToCart){
        const card = target.closest('.card');
        const title = card.querySelector('.card-title-reg').textContent;
        const cost = card.querySelector('.card-price').textContent;
        const id = buttonAddToCart.id;
        //console.log(title,cost,id);
        // проверяем есть ли такой продук с таким айдишником
        const food = cart.find(function(item){
            return item.id === id;
        });

        if(food){
            food.count = food.count +1;
            // food.count += 1;
        }else{
            cart.push({
                id,
                title,
               cost,
                count:1
            });


        }
        console.log(cart);
    }
}
//выводим элементы в корзине
function renderCart(){
    modalBody.textContent = '';

    cart.forEach(function({ id,title,cost,count }){
        const itemCart = `
<div class="food-row">
    <span class="food-name">${title}</span>
        <strong class="food-price">${cost} ₽</strong>
        <div class="food-counter">
            <button class="counter-button counter-minus" data-id=${id}>-</button>
            <span class="counter">${count}</span>
            <button class="counter-button counter-plus" data-id=${id}>+</button>
        </div>
 </div>
`;
        modalBody.insertAdjacentHTML('afterbegin', itemCart);
    });
    //аккумулирует данніе
    const totalPrice = cart.reduce(function(result,item){
        return result + (parseFloat(item.cost) * item.count);
    }, 0);
    modalPrice.textContent = totalPrice + ' grn';
}

//в модальном окне меняем количество
function changeCount(event){
    const target = event.target;
if(target.classList.contains('counter-button')){
    const food = cart.find(function(item){
        return item.id === target.dataset.id;
    });
    if(target.classList.contains('counter-minus')){
        food.count--;
        if(food.count === 0){
            cart.splice(cart.indexOf(food),1);
        }
    }
    if(target.classList.contains('counter-plus')){
        food.count++;
    }
    renderCart();
}


}

function init(){
    //с помощью then обрабатываем промисы
    getData('./db/partners.json').then(function(data){
        data.forEach(createCardsRestaurants)
    });
    modalBody.addEventListener('click', changeCount);
    cardsRestaurants.addEventListener('click' , openGoods);
    cartButton.addEventListener('click', function(){
        renderCart();
        toggleModal();
    });
    cardsMenu.addEventListener('click', addToCart);
    logo.addEventListener('click' , function(){
        containerPromo.classList.remove('hide')
        restaurants.classList.remove('hide')
        menu.classList.add('hide')
    });
    buttonClearCart.addEventListener('click' , function(){
        cart.length = 0;
        renderCart();
    });
}
init();