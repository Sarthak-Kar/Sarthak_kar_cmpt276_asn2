function detailpage(obj) {
    var x = obj.innerHTML;
    location.href = "detail.html?" + x;
}

async function remove(obj) {
    var x = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("mytable");
    var y = table.rows[x].cells[0].id;
    var str = { code: "delete from data where name=" + "'" + y + "'" + ";" };
    console.log(str);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(str),
    };

    var wait = await fetch('/update', options);
    document.location.reload(true);
}

async function showdetail() {
    const response = await fetch('/getdata');
    const temp = await response.json();
    var table = document.getElementById("mytable");
    for (let i = 0; i < temp.results.rows.length; i++) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(-1);
        cell1.innerHTML = '<span onclick="detailpage(this)">' + temp.results.rows[i]['name'] + '</span>';
        cell1.id = temp.results.rows[i]['name'];
        var cell2 = row.insertCell(-1);
        cell2.innerHTML = temp.results.rows[i]['color'];
        var cell3 = row.insertCell(-1);
        cell3.innerHTML = '<button type="button" onclick="remove(this)"> Delete </button>';
        cell3.firstChild.classList.add("but");
        cell1.firstChild.classList.add("text");
    }
}

async function addrectangle() {
    var str = { code: "insert into data values(" };
    var name = document.getElementById("name").value;
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;
    var tempcolor = document.getElementById("color").value;
    var opacity = document.getElementById("opacity").value;
    if (name.length == 0 || width.length == 0 || height.length == 0 || tempcolor.length == 0 || opacity.length == 0) {
        alert("Missing credentials");
        return;
    }
    const response = await fetch('/getdata');
    const temp = await response.json();
    for(var i=0; i<temp.results.rows.length; i++){
        if(name == temp.results.rows[i]['name']){
            alert(name + " already exists");
            return;
        }
    }
    var color = tempcolor.charAt(0).toUpperCase() + tempcolor.slice(1)
    var uid = name.concat(width, height, color, opacity);
    console.log(uid);
    str.code = str.code.concat("'", uid, "'", ", ", "'", name, "', ", width, ", ", height, ", ", "'", color, "', ", opacity, ")");

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(str),
    };

    var wait = await fetch('/update', options);
    document.location.reload(true);
}

showdetail();