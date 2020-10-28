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


function  toggleModalAuth(){
  modalAuth.classList.toggle('is-open');
}
buttonAuth.addEventListener('click', toggleModalAuth);
closeAuth.addEventListener('click', toggleModalAuth);

console.dir('buttonAuth');