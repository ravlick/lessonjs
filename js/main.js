const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
let login = localStorage.getItem('delivery');

function toggleModalAuth(){
  modalAuth.classList.toggle('is-open');
}


function authorized(){
  console.log(login);
  userName.textContent = login;
  buttonAuth.style.display='none';
  buttonOut.style.display = 'block';
  userName.style.display = 'inline';

  buttonOut.addEventListener('click' , logOut);
  function logOut(){
   login = null;
    localStorage.removeItem('delivery');
    buttonAuth.style.display='';
    buttonOut.style.display = '';
    userName.style.display = '';
    buttonOut.removeEventListener('click' , logOut);
    checkAuth();
  }
}

function notAuthorized(){
  console.log('not');
  function logIn(event){
    event.preventDefault();
    if (login = loginInput.value){
      toggleModalAuth();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit',logIn);
      logInForm.reset();
      checkAuth();
    }else{
      alert('Вы не авторизованы');
    }
localStorage.setItem('delivery' , login);
  }
  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit',logIn);
}
function checkAuth(){
  if (login){
    authorized();
  }else{
    notAuthorized();

  }
}

checkAuth();