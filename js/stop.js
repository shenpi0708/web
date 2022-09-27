ROSIP = location.hostname
ros = new ROSLIB.Ros({
    url : 'wss://'+ROSIP+':9090'
  });
  
var msg = new ROSLIB.Topic({
ros : ros,
name : '/msg_toarm',
messageType : 'std_msgs/String'
});



function stop(){
    stopbtm = document.getElementById("btnstop");
    // $('btnstop').test = '123'
    if (stopbtm.innerHTML=='STOP'){
        stopbtm.innerHTML = 'START'
        stopbtm.style.backgroundColor='green'   
        msg.publish({data: "arm_start"})  
    }

    else if (stopbtm.innerHTML=='START'){
        stopbtm.innerHTML = 'STOP'
        stopbtm.style.backgroundColor='red'
        msg.publish({data: "arm_stop"})  
    }
} 

var robot_state=document.getElementById("robot_state")

var state = new ROSLIB.Topic({
    ros: ros,
    name: '/msg_toweb',
    messageType: 'std_msgs/String'
  });
  state.subscribe(function (msg) {
    console.log(msg.data)
    robot_state.innerHTML=msg.data
  });
  