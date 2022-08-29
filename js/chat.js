const hostname = location.hostname;
const port = location.port;


var myname = '';
var datalen = 0;
async function send() {
    const jsonRequest = {}
    const text = document.getElementById("text").value;
    console.log(document.getElementById("text").value)
    
    if(myname ==''){
        myname = prompt("yourname");
    }
    mes = {talk:"('"+myname+"','"+text+"')"}
    console.log("https://"+hostname+":"+port+"/data")
    let result = await fetch("https://"+hostname+":"+port+"/data", {method: "POST", 
    headers: {"content-type": "application/json"}, body: JSON.stringify(mes) })
    result = await result.json();
    if (!result.success)  alert("FAILED! ")
    read()
  }
async function read() {
    const result = await fetch("https://"+hostname+":"+port+"/data", {method:"GET"})
    const datas = await result.json();
    var tbody = document.querySelector('tbody');
    for (var i = datalen; i < datas.length; i++) { 
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        for (var k in datas[i]) { 
            var td = document.createElement('td');
            td.innerHTML = datas[i][k];
            tr.appendChild(td);
        }
    }
    datalen=datas.length;
  }


var socket = io.connect();

socket.on("connect", function () {
  console.log('socket connect ');
});
socket.on("chat", function () {
    read()
});