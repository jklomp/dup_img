const {dialog} = require('electron').remote
const ipc = require('electron').ipcRenderer


function getdir(id){
    var path = dialog.showOpenDialog({properties: ['openDirectory']})
    if (path != undefined) {
        document.getElementById(id).innerHTML = path
        localStorage.setItem(id,path)
    }
}

function hayclick(){ 
    getdir('haydir')
}

function needleclick(){
    getdir('needledir')
}

function openDevtools()
{
    ipc.send('mainwin-open-devtools','');
}

function reload()
{
    ipc.send('reload-main-window', '');
}

function init(){
    document.getElementById('haydir').innerHTML = localStorage.getItem('haydir')
    document.getElementById('needledir').innerHTML = localStorage.getItem('needledir')
    document.addEventListener('keydown', function(event) {
        if (event.code == 'F12') { openDevtools()}
        if (event.code == 'F11') { reload()}
    });
}

function startcheck(){
    document.getElementById('result-div').innerHTML = 'please wait ...'
    let haydir = document.getElementById('haydir').innerHTML
    let needledir = document.getElementById('needledir').innerHTML
    worker.postMessage([haydir,needledir]);
}


var worker = new Worker('worker.js');

worker.onmessage = function(event) {
    document.getElementById('result-div').innerHTML = event.data[0]
}



