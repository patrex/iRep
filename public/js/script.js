feather.replace();
// Get DOM Elements
const modal = document.getElementById('signin-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.close');

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
  modal.style.display = 'block';
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let status = getParameterByName('status');
let msg = getParameterByName('msg');

if(msg){
  if(status == 1){
    let icon = document.getElementById('icon-err').style.display = 'block';
    document.getElementById('errs').style.background = 'rgba(226, 131, 131, 0.945)';
    document.getElementById('errs').style.display = 'block';
    document.getElementById('errs').innerHTML += msg;
  }else if(status == 0){
    let icon = document.getElementById('icon-success').style.display = 'block';
    document.getElementById('errs').style.background = 'rgba(113, 218, 81, 0.897)';
    document.getElementById('errs').style.borderColor = 'green'
    document.getElementById('errs').style.display = 'block';
    document.getElementById('errs').innerHTML += msg;
  }
}

window.history.replaceState(null, null, window.location.pathname);

setTimeout(() => {
  document.getElementById('errs').style.display = 'none';
}, 5000);

function close_flash(){
  document.getElementById('errs').style.display = 'none';
}

// ************Control collapsible menu**************
let springVisible = false;
const menu = document.getElementById('menu');
const menu_bar = document.getElementById('spring-menu');
menu.onclick = () => {
  if(springVisible == false){
    menu_bar.style.display = 'block';
    menu_bar.style.zIndex = '10';
    menu_bar.style.right = '2px';

    springVisible = true;
  }else{
    menu_bar.style.display = 'none';
    springVisible = false;
  }
}

function reportGFail(){
  alert('Login via Google failed');
}

function loginGoogle(gUser){
  //TODO: create object and create request
  let username = googleUser.getBasicProfile().getName();
}