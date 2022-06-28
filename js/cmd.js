var alpha, beta ,gamma,alphaO, betaO ,gammaO
var abgstart=false
const     a = document.getElementById('alpha');
const     b = document.getElementById('beta');
const     g = document.getElementById('gamma');
const     s = document.getElementById('speed');
var socket = io.connect();

socket.on("connect", function () {
  console.log('socket connect ');
});
var vec3 = new ROSLIB.Message({
  linear: {
    x: 0.0,
    y: 0.0,
    z: 0.0,
  },
  angular: {
    x: 0.0,
    y: 0.0,
    z: 0.0,
  },
});

var mobile_position_x,mobile_position_y,mobile_position_ang

//收訊息


function clickk(){
if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
    .then(permissionState => {
    // alert(permissionState);    
    if (permissionState == 'granted') {
        listener()
    }}
    )
    .catch(console.error);
} else {
    listener()
}




}
function listener(){
    window.addEventListener('deviceorientation', function(event) {
            var speed = document.getElementById("powerRange").value/50;
            alpha = Math.round(event.alpha)
            beta = Math.round(event.beta)
            gamma = Math.round(event.gamma)
            a.innerHTML = alpha
            b.innerHTML = beta
            g.innerHTML = gamma            
            if(abgstart){
                vec3.angular.z=(alpha-alphaO)*speed
                vec3.linear.x=-(beta-betaO)*speed
                vec3.linear.y=(gamma-gammaO)*speed
                socket.emit("cmd_vel",vec3)

            }
        }, false);
}
function down(){
  alphaO= a.innerHTML
  betaO= b.innerHTML
  gammaO= g.innerHTML
    abgstart=true
}
function up(){
    abgstart=false
    let vec0 = new ROSLIB.Message({
        linear: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        angular: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
      });
     socket.emit("cmd_vel",vec0)
}

function speed(){
  s.innerHTML =  document.getElementById("powerRange").value;
}
//  function convertImageToCanvas() {
//   image=URL('../img/background.png')
//   var canvas = document.createElement("canvas");
//   canvas.width = image.width;
//   canvas.height = image.height;
//   canvas.getContext("2d").drawImage(image, 0, 0); return canvas;
// }

// convertImageToCanvas()
var shapes=[];
var canvas  =document.getElementById("myCanvas");
canvas.width = 600; // 設定畫布的寬度
canvas.height = 600;// 設定畫布的高度
var ctx=canvas.getContext("2d");
ctx.lineJoin = "round"; // 指定兩條線連結處的屬性，這裡選擇用圓角
ctx.lineCap = "round"; // 指定每一條線末端的屬性，這裡選擇用圓角
ctx.strokeStyle = `red`;
ctx.lineWidth=4;
let isDrawing = false; // 用來判斷是否正在畫圖
let lastX = 0; //用來設定畫筆的X座標
let lastY = 0; //用來設定畫筆的Y座標
let AX = 0; //用來設定畫筆的X座標
let AY = 0; //用來設定畫筆的Y座標
let ang = 0;
let mobile_position_on=false;
let   lastX_nfind=0
let lastY_nfind=0
canvas.addEventListener("mousemove", (e)=>{
  if (isDrawing )
    draw(e)
} );
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX=e.offsetX
  lastY=e.offsetY

  AX=e.clientX
  AY=e.clientY
  ctx.clearRect(0,0,600,600)
  ctx.beginPath();
  angside = 0.3
  var ang2=ang-Math.PI/4
  ctx.moveTo(lastX+45.5*Math.cos(ang2+angside), lastY+45.5*Math.sin(ang2+angside));
  ctx.lineTo(lastX+45.5*Math.sin(ang2-angside), lastY-45.5*Math.cos(ang2-angside));
  ctx.lineTo(lastX-45.5*Math.cos(ang2+angside), lastY-45.5*Math.sin(ang2+angside));
  ctx.lineTo(lastX-45.5*Math.sin(ang2-angside), lastY+45.5*Math.cos(ang2-angside));
  ctx.lineTo(lastX+45.5*Math.cos(ang2+angside), lastY+45.5*Math.sin(ang2+angside));
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(lastX+40*Math.cos(ang), lastY+40*Math.sin(ang));
  ctx.stroke();
  console.log(" x:",e.offsetX," y:",e.offsetY,'angle',-ang* 180/Math.PI)  
  mobile()
});
canvas.addEventListener("mouseup", () => {isDrawing = false ;});
// canvas.addEventListener("mouseout", () => (isDrawing = false));
function draw(e) {
  if (e.offsetX){
    lastX_nfind=e.offsetX
    lastY_nfind=e.offsetY    
  }


  ctx.clearRect(0,0,600,600)

  ctx.beginPath();
  // angside = Math.atan2(53,74)
  angside = 0.25
  var ang2=ang-Math.PI/4
  ctx.moveTo(lastX+45.5*Math.cos(ang2+angside), lastY+45.5*Math.sin(ang2+angside));

  ctx.lineTo(lastX+45.5*Math.sin(ang2-angside), lastY-45.5*Math.cos(ang2-angside));
  ctx.lineTo(lastX-45.5*Math.cos(ang2+angside), lastY-45.5*Math.sin(ang2+angside));
  ctx.lineTo(lastX-45.5*Math.sin(ang2-angside), lastY+45.5*Math.cos(ang2-angside));
  ctx.lineTo(lastX+45.5*Math.cos(ang2+angside), lastY+45.5*Math.sin(ang2+angside));


  ctx.stroke();

  ctx.beginPath();
  ang = Math.atan2((lastY_nfind-lastY),(lastX_nfind-lastX))
  console.log(" x:",lastX_nfind," y:",lastY_nfind,'angle',-ang* 180/Math.PI)  

  ctx.moveTo(lastX, lastY);
  ctx.lineTo(lastX+40*Math.cos(ang), lastY+40*Math.sin(ang));
  ctx.stroke();

    mobile()
}

var ctx2=canvas.getContext("2d");
ctx2.strokeStyle = "#BADA55"; // 設定勾勒圖形時用的顏色
ctx2.lineJoin = "round"; // 指定兩條線連結處的屬性，這裡選擇用圓角
ctx2.lineCap = "round"; // 指定每一條線末端的屬性，這裡選擇用圓角


socket.on("mobile_position", function (msg) {
  mobile_position_on=true;
  mobile_position_x=msg.linear.x
  mobile_position_y=msg.linear.y
  mobile_position_ang=msg.angular.z
  draw(window.event)
});
function mobile(){
  ctx2.strokeStyle = `green`;
  var ang2=mobile_position_ang-Math.PI/4
  ctx2.beginPath();
  ctx2.moveTo(mobile_position_x+45.5*Math.cos(ang2+angside), mobile_position_y+45.5*Math.sin(ang2+angside));
  ctx2.lineTo(mobile_position_x+45.5*Math.sin(ang2-angside), mobile_position_y-45.5*Math.cos(ang2-angside));
  ctx2.lineTo(mobile_position_x-45.5*Math.cos(ang2+angside), mobile_position_y-45.5*Math.sin(ang2+angside));
  ctx2.lineTo(mobile_position_x-45.5*Math.sin(ang2-angside), mobile_position_y+45.5*Math.cos(ang2-angside));
  ctx2.lineTo(mobile_position_x+45.5*Math.cos(ang2+angside), mobile_position_y+45.5*Math.sin(ang2+angside));
  ctx2.stroke();
  ctx2.beginPath(); 

  ctx2.moveTo(mobile_position_x, mobile_position_y);
  ctx2.lineTo(mobile_position_x+40*Math.cos(mobile_position_ang), mobile_position_y+40*Math.sin(mobile_position_ang));
  ctx2.stroke();
  ctx2.strokeStyle = `red`;
}
let robotposition = new ROSLIB.Message({
  linear: {
    x: 0.0,
    y: 0.0,
    z: 0.0,
  },
  angular: {
    x: 0.0,
    y: 0.0,
    z: 0.0,
  },
});

function pubdata(){
  robotposition.linear.x=lastX
  robotposition.linear.y=lastY
  robotposition.angular.z=ang
  socket.emit("robotposition",robotposition)
}