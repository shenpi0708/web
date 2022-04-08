window.addEventListener("keydown", keysdown, false);
window.addEventListener("keyup", keyuped, false);
// ROSIP = localStorage.getItem("IP1");
// ros = new ROSLIB.Ros({
//   url : 'wss://'+ROSIP+':9090'
// });

// var cmdVel = new ROSLIB.Topic({
//   ros : ros,
//   name : '/cmd_vel',
//   messageType : 'geometry_msgs/Twist'
// });

var keys = [];
var start=false;
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


function KeyboardState() {
  const div = document.getElementById('stand_by');
  start = !start;
  if (start){
    div.style.backgroundColor = 'blue';
  }
  else{
    div.style.backgroundColor = 'white';
  }
}

function keysdown(e) {
  if (start == true) {
    var speed = document.getElementById("powerRange").value;
    keys[e.keyCode] = true;

    //RobotControl
    if (keys[83] && keys[68]) {
      //右前
      vec3.linear.x = parseFloat(speed / Math.pow(2, 0.5));
      vec3.linear.y = parseFloat(speed / Math.pow(2, 0.5));
      vec3.angular.z = 0;
      socket.emit("cmd_vel",vec3)
      //PublishTopicCmdVel(vec3);
    } else if (keys[87] && keys[68]) {
      //右後
      vec3.linear.x = -parseFloat(speed / Math.pow(2, 0.5));
      vec3.linear.y = parseFloat(speed / Math.pow(2, 0.5));
      vec3.angular.z = 0;
      socket.emit("cmd_vel",vec3)
      //PublishTopicCmdVel(vec3);
    } else if (keys[83] && keys[65]) {
      //左前
      vec3.linear.x = parseFloat(speed / Math.pow(2, 0.5));
      vec3.linear.y = -parseFloat(speed / Math.pow(2, 0.5));
      vec3.angular.z = 0;
      socket.emit("cmd_vel",vec3)
      //PublishTopicCmdVel(vec3);
    } else if (keys[87] && keys[65]) {
      //左後
      vec3.linear.x = -parseFloat(speed / Math.pow(2, 0.5));
      vec3.linear.y = -parseFloat(speed / Math.pow(2, 0.5));
      vec3.angular.z = 0;
      socket.emit("cmd_vel",vec3)
      //PublishTopicCmdVel(vec3);
    } else if (keys[68]) {
      //右
      vec3.linear.x = 0;
      vec3.linear.y = parseFloat(speed);
      vec3.angular.z = 0;
      socket.emit("cmd_vel",vec3)
      // PublishTopicCmdVel(vec3);
    } else if (keys[83]) {
      //前
      // vec3.linear.x = 100; //parseFloat(speed);
      vec3.linear.x = parseFloat(speed);
      vec3.linear.y = 0;
      vec3.angular.z = 0;
      socket.emit("cmd_vel",vec3)
      //PublishTopicCmdVel(vec3);
    } else if (keys[65]) {
      //左
      vec3.linear.x = 0;
      vec3.linear.y = -parseFloat(speed);
      vec3.angular.z = 0;
      socket.emit("cmd_vel",vec3)
      //PublishTopicCmdVel(vec3);
    } else if (keys[87]) {
      // 後
      vec3.linear.x = -parseFloat(speed);
      vec3.linear.y = 0;
      vec3.angular.z = 0;
      socket.emit("cmd_vel",vec3)
      //PublishTopicCmdVel(vec3);
    } else if (keys[69]) {
      var speed_;
      if (Math.abs(parseFloat(speed)) > 15) {
        speed_ = parseFloat(speed) * 0.5;
      } else {
        speed_ = speed;
      }
      vec3.linear.x = 0;
      vec3.linear.y = 0;
      vec3.angular.z = -parseFloat(speed_);

      socket.emit("cmd_vel",vec3)
      //PublishTopicCmdVel(vec3);
    } else if (keys[81]) {
      var speed_;
      if (Math.abs(parseFloat(speed)) > 15) {
        speed_ = parseFloat(speed) * 0.5;
      } else {
        speed_ = speed;
      }
      vec3.linear.x = 0;
      vec3.linear.y = 0;
      vec3.angular.z = parseFloat(speed_);

      socket.emit("cmd_vel",vec3)
      //PublishTopicCmdVel(vec3);
    }
  }
}
function releasebutton(state) {
  let vec3 = new ROSLIB.Message({
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
  switch (state) {
    case 81:
      vec3.angular.z = 0;
      break;
    case 69:
      vec3.angular.z = 0;
      break;
    case 87:
      vec3.linear.y = 0;
      break;
    case 65:
      vec3.linear.x = 0;
      break;
    case 83:
      vec3.linear.y = 0;
      break;
    case 68:
      vec3.linear.x = 0;
      break;
    default:
      vec3.linear.x = 0;
      vec3.linear.y = 0;
      vec3.angular.z = 0;
  }
  //if(state==81||state==69||state==87||state==65||state==83||state==68){
  //    console.log("stop");
  //    PublishTopicCmdVel(vec3);
  //}
  socket.emit("cmd_vel",vec3)
}

function keyuped(e) {
  if (start) {
    //console.log("start moving");
    if (keys[e.keyCode] == true) releasebutton(e.keyCode);
    //else if (keys[69] == true) releasebutton(69);
    //else if (keys[87] == true) releasebutton(87);
    //else if (keys[65] == true) releasebutton(65);
    //else if (keys[83] == true) releasebutton(83);
    //else if (keys[68] == true) releasebutton(68);
    keys[e.keyCode] = false;
  }
}
