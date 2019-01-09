feather.replace();

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

const trash = document.getElementById('delete');
trash.onclick = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `/api/v1/red-flags/${id}`, true);
    xhr.send();
}