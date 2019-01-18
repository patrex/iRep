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
        if(xhr.status !== 200)
            console.log('Operation failed')
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
                            <i class="far fa-file-image action" id="add-image"></i>
                            <i class="fas fa-map-pin action" id="add-loc"></i>
                            <i class="far fa-trash-alt action" id="del"></i>
                            <i class="fas fa-pencil-alt action" id="mod"></i>
                        </div>
                    </div>
                `

                handlebars.insertAdjacentHTML('beforeend', html);
            }
        }
    }
}

// const trash = document.getElementById('delete');
// trash.onclick = (id) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('DELETE', `/api/v1/red-flags/${id}`, true);
//     xhr.send();
// }