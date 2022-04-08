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
