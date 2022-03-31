let left = false;
let right = false;
var socket = io.connect();
socket.on("connect", function () {
  console.log('socket connect ');
});

function leftCLK(){ 
    if(left===true){
        left=false;
        document.getElementById('leftarm').style.background="white"
    }
    else{
        left=true
        document.getElementById('leftarm').style.background="blue"
    }
}
function rightCLK(){
    if(right===true){
        right=false;
        document.getElementById('rightarm').style.background="white"
    }
    else{
        document.getElementById('rightarm').style.background="blue"
        right=true
    }
}

function set_modle(){ //ok
    var data = string
    data.data='set_mode'
    if (left===true)
        socket.emit("/left_arm/set_mode_msg",data)
    if(right===true)
        socket.emit("/right_arm/set_mode_msg",data)
}   
function current(){  //ok
    if (left===true)
    _current('left')
    if(right===true)
    _current('right')
}
function Joint_Val(){ //ok
    var jointdata =JointPose
    var slidedata = slidetype 
    var data
    if (left===true){
        data=_armjointdata('L')
        slidedata.pos =data[0]
        data.shift();
        jointdata.speed =data[0]
        data.shift();
        jointdata.value=data
        socket.emit("/left_arm/joint_pose_msg",jointdata)
        socket.emit("/left_arm/slide_command_msg",slidedata)
    }
    if(right===true){
        data=_armjointdata('R')
        slidedata.pos =data[0]
        data=data.shift();
        jointdata.position=data
        socket.emit("/right_arm/joint_pose_msg",jointdata)
        socket.emit("/right_arm/slide_command_msg",slidedata)        
    }

}

function Initial_Pose(){
    var data = string
    data.data='ini_pose'
    if (left===true)
        socket.emit("/left_arm/specific_pose_ms",data)
    if(right===true)
        socket.emit("/right_arm/specific_pose_ms",data)
}

function home(){//ok
    var data = string
    data.data='home_pose'
    if (left===true)
        socket.emit("/left_arm/specific_pose_ms",data)
    if(right===true)
        socket.emit("/right_arm/specific_pose_ms",data)
}
////////////////////qwe/////////////////////////
function Line_Pos(){
    console.log('asd')
}
function P2P_Pos(){
    console.log('asd')
}
function Moveit_Pos(){
    console.log('asd')
}
/////////////////////////////////////////////

function Grap(){
    var data = string
    data.data='Gripper_grap_Alcohol'
    if (left===true)
        socket.emit("/left_arm/grap_alcohol_msg",data)
    if(right===true)
        socket.emit("/right_arm/grap_alcohol_msg",data)
}
function release(){
    var data = string
    data.data='Gripper_release'
    if (left===true)
        socket.emit("/left_arm/release_pose_msg",data)
    if(right===true)
        socket.emit("/right_arm/release_pose_msg",data)
}
//////////////////////////暫時沒有topic//////////////////
function suckerON(){
    console.log('asd')
}
function suckerOFF(){
    console.log('asd')
}
//////////////////qwe///////////////////////////
function Reletive_movement(name,is_up){
    console.log('asd')
}
/////////////////////////////////////////////
function _current(where){
    try{
        var data  = list()
        for (let i=0;i< 8;i++){
            data.append('joint{}'.format(i))
        }
        socket.emit('/'+where+'_arm/get_joint_pose', data, function (answer) {
            for( let i = 1; i <= 7; i++){
                document.getElementById("Joint"+where+i).value=answer[i-1]     
             }
        });
        socket.emit('/'+where+'_arm/get_kinematics_pose','arm',function (answer) {
            for( let i = 9; i <= 15; i++){
                document.getElementById("Joint"+where+i).value=answer[i-1]     
             }
        })        
    }
    catch(error) {
        console.log("Service call failed: %s" % error)
    }
}

function _armjointdata(where){
    var data=[] 
    
     data.push(document.getElementById("Slide"+where).value)
     data.push(document.getElementById("Joint8").value)
     for( let i = 1; i <= 7; i++){
        data.push(document.getElementById("Joint"+where+i).value)      
     }
     return data
}
function _armlinedata(where){
    var data=[] 
     data.push(document.getElementById("Joint8").value)
     for( let i = 9; i <= 15; i++){
        data.push(document.getElementById("Joint"+where+i).value)      
     }
     return data
}


function createlist(name,type,range){
    var button = document.body.appendChild(document.createElement("input"));
    button.className='textn'
    button.setAttribute("type", type);
    button.value = name;
    button.step = range;
    button.id='textn'
    console.log(button)
}
createlist('0.00','number','0.01')