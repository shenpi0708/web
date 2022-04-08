let left = false;
let right = false;
var joint_pose_current
var kinematics_current
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
        _current('left','L')
    if(right===true)
        _current('right','R')
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
        console.log(data)
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
        socket.emit("/left_arm/specific_pose_msg",data)
    if(right===true)
        socket.emit("/right_arm/specific_pose_msg",data)
}

function home(){//ok
    var data = string
    data.data='home_pose'
    if (left===true)
        socket.emit("/left_arm/specific_pose_msg",data)
    if(right===true)
        socket.emit("/right_arm/specific_pose_msg",data)
}
////////////////////100%/////////////////////////
function Line_Pos(){
    var data = P2PPose
    if (left===true){
        data = datatf(data,'L')
        socket.emit("/left_arm/kinematics_pose_msg",data)        
    }

    if(right===true){
        data = datatf(data,'R')
        socket.emit("/right_arm/kinematics_pose_msg",data)        
    }

}
function P2P_Pos(){
    var data = P2PPose
    if (left===true){
        data = datatf(data,'L')
        socket.emit("/left_arm/p2p_pose_msg",data)
    } 
    if(right===true){
        data = datatf(data,'R')
        socket.emit("/right_arm/p2p_pose_msg",data)
    }
        
}
function Moveit_Pos(){
    var data = P2PPose
    if (left===true){
        data = datatf(data,'L')
        socket.emit("/left_arm/p2p_pose_msg",data)
    } 
    if(right===true){
        data = datatf(data,'R')
        socket.emit("/right_arm/p2p_pose_msg",data)
    }
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
//////////////////0%///////////////////////////
function Reletive_movement(name,value){
    current()
    document.getElementById("Joint"+name+i).value+=value
    P2P_Pos()
}
/////////////////////////////////////////////
////////////////////少pi/180 資料順序有問題/////
function _current(where,wh){
    // try{
        var string = {
            'joint_name': ['joint1','joint2','joint3', 'joint4', 'joint5', 'joint6', 'joint7']
        }
        socket.emit('/'+where+'_arm/get_joint_pose',string, function (answer) {
            joint_pose_current=answer
            for( let i = 0; i < 7; i++){
                answer.joint_value[i] = Math.round(answer.joint_value[i]*180/Math.PI * 100) / 100
                document.getElementById("Joint"+wh+(i+1)).value=Math.round(answer.joint_value[i] * 100) / 100
             }
             document.getElementById("Slide"+wh).value=Math.round(answer.slide_pos * 100) / 100
            console.log(answer)
        });
        socket.emit('/'+where+'_arm/get_kinematics_pose',{group_name:"arm"},function (answer) {
            kinematics_current=answer
            document.getElementById("Joint"+wh+'12').value = Math.round(-answer.group_pose.orientation.y*180*2/Math.PI * 100) / 100
            document.getElementById("Joint"+wh+'13').value= Math.round(answer.group_pose.orientation.z*180*2/Math.PI * 100) / 100
            document.getElementById("Joint"+wh+'14').value =Math.round( -answer.group_pose.orientation.w*180*2/Math.PI * 100) / 100

            document.getElementById("Joint"+wh+'9').value =Math.round( -answer.group_pose.position.x * 100) / 100
            document.getElementById("Joint"+wh+'10').value =Math.round( -answer.group_pose.position.y * 100) / 100
            document.getElementById("Joint"+wh+'11').value =Math.round( -answer.group_pose.position.z * 100) / 100
            document.getElementById("Joint"+wh+'15').value = Math.round(answer.phi*180/Math.PI * 100) / 100
        })  
        // console.log(string)      
    // }
    // catch(error) {
    //     console.log("Service call failed: %s" % error)
    // }
}
/////////////////////////////////////////////////
function _armjointdata(where){
    var data=[] 

     data.push(document.getElementById("Slide"+where).value)
     data.push(document.getElementById("Joint8").value)
     for( let i = 1; i <= 7; i++){
        data.push(document.getElementById("Joint"+where+i).value*Math.PI/180)      
     }
     console.log(data)
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



function datatf(data,where){
    var htmldata = _armlinedata(where)
    data.pose.speed=htmldata[0]
    data.pose.position.x=htmldata[1]
    data.pose.position.y=htmldata[2]
    data.pose.position.z=htmldata[3]
    data.pose.orientation.y=htmldata[5]*Math.PI/180
    data.pose.orientation.z=htmldata[6]*Math.PI/180
    data.pose.orientation.w=htmldata[7]*Math.PI/180
    data.pose.phi=htmldata[4]*Math.PI/180    
    console.log(data)
    return data
}