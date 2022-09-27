ROSIP = location.hostname
console.log(ROSIP)
ros = new ROSLIB.Ros({
  url : 'wss://'+ROSIP+':9090'
});

var cmdVel = new ROSLIB.Topic({
  ros : ros,
  name : '/cmd_vel',
  messageType : 'geometry_msgs/Twist'
});

var alpha, beta ,gamma,alphaO, betaO ,gammaO
var abgstart=false
const     a = document.getElementById('alpha');
const     b = document.getElementById('beta');
const     g = document.getElementById('gamma');
const     s = document.getElementById('speed');
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

var mobile_position_x,mobile_position_y,mobile_position_ang




//connet to nodejs
var socket = io.connect();

socket.on("connect", function () {
  console.log('socket connect ');
});


// Require user consent to use gyroscope
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

//read gyroscope
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

                vec3.angular.z=checkrange(alpha-alphaO)/360*Math.PI
                vec3.linear.x=checkrange(beta-betaO)*speed
                vec3.linear.y=checkrange(gamma-gammaO)*speed
                cmdVel.publish(vec3);
                document.getElementById("demo").innerHTML = vec3.angular.z +"x"+ vec3.linear.x+"Y"+ vec3.linear.y;
            }
        }, false);
}
//check range in -180 to 180
function checkrange(data){
  
  if (data<-180)
    data=data+360
  else if(data>180)
    data=data-360
  else
    data=data
  if (data<10&& data>-10  ){
    return 0
  }
  else{
    return data
  }
}


//move
function down(){
  alphaO= a.innerHTML
  betaO= b.innerHTML
  gammaO= g.innerHTML
    abgstart=true
}
//stop
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
      cmdVel.publish(vec0);
}
//speed
function speed(){
  s.innerHTML =  document.getElementById("powerRange").value;
}


//canvas setting
var shapes=[];
var canvas  =document.getElementById("myCanvas");
canvas.width = 600; 
canvas.height = 600;
var ctx=canvas.getContext("2d");
ctx.lineJoin = "round"; 
ctx.lineCap = "round"; 
ctx.strokeStyle = `red`;
ctx.lineWidth=4;
let isDrawing = false; 
let lastX = 0; 
let lastY = 0; 
let AX = 0; 
let AY = 0; 
let ang = 0;
let mobile_position_on=false;
let   lastX_nfind=0
let lastY_nfind=0


//mousecheck
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

/*draw data 
* @param {string} e - envparam includ mouse loacation.
*/
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

// subscrip topices
// socket.on("mobile_position", function (msg) {
//   mobile_position_on=true;
//   mobile_position_x=msg.linear.x
//   mobile_position_y=msg.linear.y
//   mobile_position_ang=msg.angular.z
//   draw(window.event)
// });
var imu_3d = new ROSLIB.Topic({
  ros: ros,
  name: 'mobile_position',
  messageType: 'geometry_msgs/Twist'
});
imu_3d.subscribe(function (msg) {
  mobile_position_on=true;
  mobile_position_x=msg.linear.x
  mobile_position_y=msg.linear.y
  mobile_position_ang=msg.angular.z
  draw(window.event)
});

//mobile  show screan
function mobile(){
  ctx.strokeStyle = `green`;
  var ang2=mobile_position_ang/180*Math.PI-Math.PI/4
  ctx.beginPath();
  ctx.moveTo(mobile_position_x+45.5*Math.cos(ang2+angside), mobile_position_y+45.5*Math.sin(ang2+angside));
  ctx.lineTo(mobile_position_x+45.5*Math.sin(ang2-angside), mobile_position_y-45.5*Math.cos(ang2-angside));
  ctx.lineTo(mobile_position_x-45.5*Math.cos(ang2+angside), mobile_position_y-45.5*Math.sin(ang2+angside));
  ctx.lineTo(mobile_position_x-45.5*Math.sin(ang2-angside), mobile_position_y+45.5*Math.cos(ang2-angside));
  ctx.lineTo(mobile_position_x+45.5*Math.cos(ang2+angside), mobile_position_y+45.5*Math.sin(ang2+angside));
  ctx.stroke();
  ctx.beginPath(); 
  console.log(mobile_position_x,lastX)
  ctx.moveTo(mobile_position_x, mobile_position_y);
  ctx.lineTo(mobile_position_x+40*Math.cos(mobile_position_ang/180*Math.PI), mobile_position_y+40*Math.sin(mobile_position_ang/180*Math.PI));
  ctx.stroke();
  ctx.strokeStyle = `red`;
}

//push mobile target position to ros
function pubdata(){
  robotposition.linear.x=lastX
  robotposition.linear.y=lastY
  robotposition.angular.z=ang
  cmdVel.publish(robotposition);
}