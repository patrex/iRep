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

const handlebars = document.getElementById('content');
function loadData(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/v1/red-flags', true);
    xhr.send();

    xhr.onload = () => {
        if(xhr.status !== 200){
            showAlert('Could not fetch data.<br>Reload the page or try again later');

            const alertClose = document.getElementById('alert-close');
            const alertBox = document.getElementById('alert-box');
        
            alertClose.onclick = () => {
                alertBox.style.display = 'none';
            }

            handlebars.insertAdjacentHTML('afterbegin',
                ` <i class="fas fa-fill-drip" id="drip"></i> `
            )
        }
           
        else {
            let result = JSON.parse(xhr.response);
            const res_arr = result.Result;
            
            
            for(let i = 0; i < res_arr.length; i++){
                let html = `
                    <div class="case" data-id="${res_arr[i].id}">
                        Created by: ${res_arr[i].created_by}<br><br>
                        Status: ${res_arr[i].current_status}<br><br>
                        Comment: ${res_arr[i].comment}<br>
                        <div class="options">
                            <i class="far fa-file-image action" id="add-image${res_arr[i].id}" onclick="warnCritical(addImage, this)"></i>
                            <i class="fas fa-map-pin action" id="add-loc${res_arr[i].id}" onclick="addLocation()"></i>
                            <i class="far fa-trash-alt action" id="del${res_arr[i].id}" onclick="warnCritical(deletePost, this)"></i>
                            <i class="fas fa-pencil-alt action" id="mod${res_arr[i].id}" onclick="edit()"></i>
                        </div>
                    </div>
                `
                
                handlebars.insertAdjacentHTML('beforeend', html);
            }
        }
    }
}

function showAlert(msg){
    const alert = `
        <div id="alert-box">
            <div id="alert-header">
                Critical Error
                <span id="alert-close">&times;</span>
            </div> 
            <div id="alert-body"> <p id="msg">${msg}</p></div>
            <div id="alert-footer">ireporter</div>
        </div>
    `
    handlebars.insertAdjacentHTML('beforeend', alert);
}

function warnCritical(functionid, data){
    const conf = document.getElementById('conf');
    const box = document.getElementById('confirm-box');

    box.style.display = 'flex';

    conf.onclick = () => {
        box.style.display = 'none';
        functionid(data);   
    }

    decl.onclick = () => box.style.display = 'none';
}

function deletePost(elt){
    const id = elt.parentElement.parentElement.dataset.id;
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `/api/v1/red-flags/${id}`, true);
    xhr.send();
    
    //resend fertch request to update items
    elt.parentElement.parentElement.remove();
}

function addImage(data){
    alert(data);
}

