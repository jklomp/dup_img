const fs = require ('fs')

//////////////////////////////////////////////////////////////////////////////////////
//
//                                 html output 
//
/////////////////////////////////////////////////////////////////////////////////////

function makeHtml(list){
    // non-duplicates
        let imgId = 0
        let s = '<h1> Result</h1>'
    
        s = s + `<h2> Images without duplicate:</h2>`
        for (var i=0; i < list.length; i++){
            if (!list[i].hasOwnProperty('dup')) {
                    let pathname = list[i].dir + '/' + list[i].name
                    let filename = list[i].name
                    let caption = `<a id="img-${imgId}" href="${pathname}" target="_blank">${filename}</a>`
                    if (list[i].hasOwnProperty('samename')) {
                        for (var j=0; j < list[i].samename.length; j++) 
                            caption += `<br> >> <a href="${list[i].samename[j] + '/' + filename}" target = "_blank">${list[i].samename[j]}</a>` 
    
                    }
                    let image =
    `
    <figure></figure>
        <img style="width:300px" src="${pathname}" onclick="document.getElementById('img-${imgId}').click()"/> 
        <figcaption>${caption}</figcaption>
    </figure>
    `
                    s = s + image
                    imgId++
            }
        }
        s = s + `<h2> Images with duplicate: </h2>
        <table>
        `
    
        for (var i=0; i < list.length; i++) if (list[i].hasOwnProperty('dup')) {
            let filename = list[i].name
            s = s + `<tr> <td class="td1"> ${filename} </td><td class="td1">`
            for (var j=0; j < list[i].dup.length; j++){
                let pathname = list[i].dup[j]
                s = s + `${pathname}<br>`
            }        
            s = s +`</td></tr>`
        }
        s = s +'</table>'
        return s
    }
    
    
    
    
    //////////////////////////////////////////////////////////////////////////////////////
    //
    //                                 make file lists 
    //
    /////////////////////////////////////////////////////////////////////////////////////
    
    
    
    function walkSync(dir, filelist) {
        var files = fs.readdirSync(dir);
        for (var i=0; i < files.length; i++) {
            if (fs.statSync(dir + '/' + files[i]).isDirectory()) {
                postMessage(['processing directory ' + files[i]])
                walkSync(dir + '/' + files[i], filelist);
            }
            //else filelist.push(files[i]+' - ' + dir.substring(baselen)); 
            else {
                filename = dir + '/' + files[i] 
                const stats = fs.statSync(filename)
                filelist.push({name:files[i].toLowerCase(), size:stats.size, dir:dir}); 
            }
        };
        return filelist;
    };
    
    function sort(a,b){
        if (a.name > b.name) return 1
        if (a.name == b.name) return 0
        return -1  
    }
    function doWalkSync(dir){
        list = []
        let filelist = walkSync(dir,list)
        filelist.sort(sort);
        return filelist;
    }
    
    
    //////////////////////////////////////////////////////////////////////////////////////
    //
    //                                 find duplicates 
    //
    /////////////////////////////////////////////////////////////////////////////////////
    
    
    function findDuplicates(hay,needles){
    
        let dupcount = 0
        for (var i=0; i < needles.length; i++) {
            let needle = needles[i]
            postMessage(['find duplicates of ' + needle.name])
            for (var j=0; j < hay.length; j++ ) {
                if (needle.name == hay[j].name  && needle.size == hay[j].size) {
                    dupcount++
                    if (!needles[i].hasOwnProperty('dup')) needles[i]['dup'] = []
                    needles[i]['dup'].push(hay[j].dir)
                }
                else {
                    if (needle.name == hay[j].name) {
                        if (!needles[i].hasOwnProperty('samename')) needles[i]['samename'] = []
                        needles[i]['samename'].push(hay[j].dir)
                    }               
                }
            }
        }
        return needles
    }
    
    function mainprog(haydir,needledir){
        var hay =  doWalkSync(haydir)
        var needles =  doWalkSync(needledir)
        var list = findDuplicates(hay, needles)
        var html = makeHtml(list)
        postMessage([html])
    }

    onmessage = function(e) {
        let haydir = e.data[0]
        let needledir = e.data[1]
        mainprog(haydir,needledir)
    }
    
    