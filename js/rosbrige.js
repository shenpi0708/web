var ROSIP=''
var _ROSIP=''
var ros
var err =null
let myEvent = new CustomEvent("pingan",);

rem()
Connection()

function rem(){
  if (typeof(Storage) !== "undefined") {
    if (localStorage.getItem("IP1") != null &&localStorage.getItem("IP1") != 'null') {
      ROSIP = localStorage.getItem("IP1");
    } else {
      ROSIP = "localhost";
      localStorage.setItem('IP1', 'localhost');
      console.log('hi3');
    }
  } else {
    console.log('Sorry, your browser does not support Web Storage...');
    ROSIP='localhost'
  }  
}

function IPDATA() {  
  if( _ROSIP = prompt('請輸入IP', ROSIP)){
    ROSIP = _ROSIP
  }
  Connection()
}
function Connection(){
    ros = new ROSLIB.Ros({
    url : 'wss://'+ROSIP+':9090'
  });
  ros.on('connection', function() {
    console.log('Connected to websocket server.');
    document.getElementById("btnlight").style='background-image: url( ../img/light1.png );'
    document.getElementById("btnlight").disabled="true"
    Classdisabled(null)
    localStorage.setItem('IP1', ROSIP);
    
  });

  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
    document.getElementById("btnlight").style='background-image: url( ../img/light2.png );'
    document.getElementById("btnlight").disabled=null
    Classdisabled(err)
    window.dispatchEvent(myEvent);
  });

  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
    document.getElementById("btnlight").style='background-image: url( ../img/light2.png );'
    document.getElementById("btnlight").disabled=null
    Classdisabled(err)
    window.dispatchEvent(myEvent);
  });  
}


function Classdisabled(is_disabled){
  for(i=0;i<document.getElementsByClassName("button").length;i++){
    document.getElementsByClassName("button")[i].disabled=is_disabled
  }
  
}
