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

//收訊息
socket.on("/mesege", function (msg) {
  console.log(msg)
});

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
ctx.strokeStyle = "#BADA55"; // 設定勾勒圖形時用的顏色
ctx.lineJoin = "round"; // 指定兩條線連結處的屬性，這裡選擇用圓角
ctx.lineCap = "round"; // 指定每一條線末端的屬性，這裡選擇用圓角
let isDrawing = false; // 用來判斷是否正在畫圖
let lastX = 0; //用來設定畫筆的X座標
let lastY = 0; //用來設定畫筆的Y座標
let AX = 0; //用來設定畫筆的X座標
let AY = 0; //用來設定畫筆的Y座標

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX=e.offsetX
  lastY=e.offsetY
  AX=e.clientX
  AY=e.clientY
  ctx.clearRect(0,0,600,600)
  ctx.beginPath();
  ctx.arc(e.offsetX,e.offsetY,10,0,2*Math.PI);
  ctx.stroke();
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
function draw(e) {
  if (!isDrawing) return; //如果不是在mousedown的時候，這個function不作用
  //console.log(e.offsetX,e.offsetY);
  ctx.clearRect(0,0,600,600)
  ctx.beginPath();
  ctx.arc(lastX,lastY,10,0,2*Math.PI);
  ctx.stroke();
  ctx.strokeStyle = `red`;
  ctx.beginPath();
  let ang = Math.atan2((e.offsetY-lastY),(e.offsetX-lastX))
  console.log(" x:",e.offsetX," y:",e.offsetY,'angle',ang* 180/Math.PI)  

  
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(lastX+10*Math.cos(ang), lastY+10*Math.sin(ang));
  ctx.stroke();

}

