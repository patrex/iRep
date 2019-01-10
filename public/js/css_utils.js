feather.replace();

const alertClose = document.getElementById('alert-close');
const alertBox = document.getElementById('alert-box');

alertClose.onclick = () => {
    alertBox.style.display = 'none';
}