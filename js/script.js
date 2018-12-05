//Get required DOM elements
var xhttp = new XMLHttpRequest()

const signinBtn = document.querySelector('#signin-btn');
signinBtn.addEventListener('click', signIn);

function signIn(){
  
  const username = document.getElementById('username').value;
  alert(username);
  

  // xhttp.open('GET', 'localhost:3000/api/v1/red-flags', true)
}















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

