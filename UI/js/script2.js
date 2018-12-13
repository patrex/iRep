// Get DOM Elements
const signUpModal = document.getElementById('signup-modal');
const modalBtn2 = document.querySelector('#modal-btn1');
const closeBtn2 = document.getElementById('close2');

// Events
modalBtn2.addEventListener('click', openModal2);
closeBtn2.addEventListener('click', closeModal2);
window.addEventListener('click', outsideClick2);

// Open
function openModal2() {
    signUpModal.style.display = 'block';
}

// Close
function closeModal2() {
    signUpModal.style.display = 'none';
}

// Close If Outside Click
function outsideClick2(e) {
  if (e.target == signUpModal) {
    signUpModal.style.display = 'none';
  }
}
