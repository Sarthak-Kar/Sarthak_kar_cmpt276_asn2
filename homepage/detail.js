async function getdata() {
    const response = await fetch('/getdata');
    const temp = await response.json();
    
    var index, i;
    for ( i = 0; i < temp.results.rows.length; i++) {
        if(temp.results.rows[i]['name']==queryString){
            index = i;
            break;
        }
    }
    var target = temp.results.rows[i];
    document.getElementById("uid").innerHTML = target['uid'];
    document.getElementById("name").innerHTML = target['name'];
    document.getElementById("width").innerHTML = target['width'];
    document.getElementById("height").innerHTML = target['height'];
    document.getElementById("color").innerHTML = target['color'];
    document.getElementById("opacity").innerHTML = target['opacity'];

    document.getElementById("box").style.backgroundColor = target['color'];
    document.getElementById("box").style.opacity = target['opacity']/100;
    var new_width = target['width']+100;
    document.getElementById("box").style.width = new_width+"px";
    var new_height = target['width']+100;
    document.getElementById("box").style.height = new_height+"px";
    document.getElementById("preview_name").innerHTML = target['name'];   
}

function gotohomepage() {
    location.href = "index.html";
}

const queryString = location.search.substring(1);

getdata();