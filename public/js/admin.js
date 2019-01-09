feather.replace();

document.getElementById('lastlogin').innerHTML += new Date().toISOString();

let menu = document.getElementById('menu-toggle');
let sideMenu = document.getElementById('spring-menu');
let menuVisible = false;


menu.onclick = () => {
    if(menuVisible == false){
        sideMenu.style.display = 'block';
        sideMenu.style.zIndex = '10';
        sideMenu.style.right = '2px';
    
        menuVisible = true;
    }else{
        sideMenu.style.display = 'none';
        menuVisible = false;
    }
}