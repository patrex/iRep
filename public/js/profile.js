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

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let username = getParameterByName("user");
if(username != undefined){
    const welcome = document.getElementById('welcome-user');
    welcome.insertAdjacentHTML("afterbegin", `<strong>Welcome,</strong> ${username}`);
}
window.history.replaceState(null, null, window.location.pathname);

//render counters
const content = document.getElementById('content');

function loadData(){
    let payload = undefined;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/v1/count', true);
    xhr.send();

    xhr.onload = () => {
        if(xhr.status != 200){
            console.log('There was an error: ' + xhr.statusText);
            const html = `
                <div class="cover">
                    <div class="info-box">  
                        <div class="box-data">0</div>
                        <div class="box-title">Red-flags</div> 
                    </div>

                    <div class="pellet">Redflag incidents</div>
                    <div class="pellet-data">0</div>
                </div>

                <div class="cover">
                    <div class="info-box">
                        <div class="box-data">0</div>
                        <div class="box-title">Interventions</div>
                    </div>
                    <div class="pellet">Interventions</div>
                    <div class="pellet-data">0</div>
                </div>


                <div class="cover">
                    <div class="info-box">
                        <div class="box-data">0</div>
                        <div class="box-title">Reds Resolved</div>
                    </div>
                    <div class="pellet">Redflags Resolved</div>
                    <div class="pellet-data">0</div>
                </div>

                <div class="cover">
                    <div class="info-box">
                        <div class="box-data">0</div>
                        <div class="box-title">Ints Resolved</div>
                    </div>
                    <div class="pellet">Interventions Resolved</div>
                    <div class="pellet-data">0</div>
                </div>

                <div class="cover">
                    <div class="info-box">
                        <div class="box-data">0</div>
                        <div class="box-title">Reds Rejected</div>
                    </div>

                    <div class="pellet">Redflags Rejected</div>
                    <div class="pellet-data">0</div>
                </div>
            
                <div class="cover">
                    <div class="info-box">
                        <div class="box-data">0</div>
                        <div class="box-title">Ints Rejected</div>
                    </div> 
                    <div class="pellet">Interventions Rejected</div>
                    <div class="pellet-data">0</div>
                </div> 

                <div class="cover">
                    <div class="info-box">
                        <div class="box-data">0</div>
                        <div class="box-title">Reds Draft</div>
                    </div> 
                    <div class="pellet">Redflags In Draft</div>
                    <div class="pellet-data">0</div>
                </div>

                <div class="cover">
                    <div class="info-box">
                        <div class="box-data">0</div>
                        <div class="box-title">Ints Draft</div>
                    </div>
                    <div class="pellet">Interventions in Draft</div>
                    <div class="pellet-data">0</div>
                </div> 

                `
            content.insertAdjacentHTML("afterbegin", html);
        }else{
            payload = JSON.parse(xhr.responseText);
            const html = `
                <div class="cover">
                    <div class="info-box">  
                        <div class="box-data">${payload.countAllRed}</div>
                        <div class="box-title">Red-flags</div> 
                    </div>

                    <div class="pellet">Redflag incidents</div>
                    <div class="pellet-data">${payload.countAllRed}</div>
                </div>

                <div class="cover">
                    <div class="info-box">
                        <div class="box-data">${payload.countAllInt}</div>
                        <div class="box-title">Interventions</div>
                    </div>
                    <div class="pellet">Interventions</div>
                    <div class="pellet-data">${payload.countAllInt}</div>
                </div>


                <div class="cover">
                    <div class="info-box">
                        <div class="box-data">${payload.countResRed}</div>
                        <div class="box-title">Reds Resolved</div>
                    </div>
                    <div class="pellet">Redflags Resolved</div>
                    <div class="pellet-data">${payload.countResRed}</div>
                </div>

                <div class="cover">
                    <div class="info-box">
                        <div class="box-data">${payload.countResInt}</div>
                        <div class="box-title">Ints Resolved</div>
                    </div>
                    <div class="pellet">Interventions Resolved</div>
                    <div class="pellet-data">${payload.countResInt}</div>
                </div>

                <div class="cover">
                    <div class="info-box">
                        <div class="box-data">${payload.countRejRed}</div>
                        <div class="box-title">Reds Rejected</div>
                    </div>

                    <div class="pellet">Redflags Rejected</div>
                    <div class="pellet-data">${payload.countRejRed}</div>
                </div>
            
                <div class="cover">
                    <div class="info-box">
                        <div class="box-data">${payload.countRejInt}</div>
                        <div class="box-title">Ints Rejected</div>
                    </div> 
                    <div class="pellet">Interventions Rejected</div>
                    <div class="pellet-data">${payload.countRejInt}</div>
                </div> 

                <div class="cover">
                    <div class="info-box">
                        <div class="box-data">${payload.countDraftRed}</div>
                        <div class="box-title">Reds Draft</div>
                    </div> 
                    <div class="pellet">Redflags In Draft</div>
                    <div class="pellet-data">${payload.countDraftRed}</div>
                </div>

                <div class="cover">
                    <div class="info-box">
                        <div class="box-data">${payload.countDraftInt}</div>
                        <div class="box-title">Ints Draft</div>
                    </div>
                    <div class="pellet">Interventions in Draft</div>
                    <div class="pellet-data">${payload.countDraftInt}</div>
                </div> 

                `
            content.insertAdjacentHTML("afterbegin", html);
        }
    }
    
}

