let left = false;
let right = false;
function armjointdata(where){
    var data=[] 
     data.push(document.getElementById("Slide"+where).value)
     for( let i = 1; i <= 7; i++){
        data.push(document.getElementById("Joint"+where+i).value)      
     }
     return data
}
function armlinedata(where){
    var data=[] 
     data.push(document.getElementById("Joint8").value)
     for( let i = 9; i <= 15; i++){
        data.push(document.getElementById("Joint"+where+i).value)      
     }
     return data
}
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

function set_modle(){
    var data = new ROSLIB.Message({
        data: "set_mode"
      });
    if (left===true)
        socket.emit("/left_arm/set_mode_msg",vec3)
    if(right===true)
        socket.emit("/right_arm/set_mode_msg",vec3)
}   
function current(){
    if (left===true)
    _current('left')
    if(right===true)
    _current('right')
}
function Joint_Val(){
    // if (left===true)
    // _current('left')
    // if(right===true)
    // _current('right')
}
function Initial_Pose(){
    console.log('asd')
}
function home(){
    console.log('asd')
}
function Line_Pos(){
    console.log('asd')
}
function P2P_Pos(){
    console.log('asd')
}
function Grap_Pos(){
    console.log('asd')
}
function Grap(){
    console.log('asd')
}
function release(){
    console.log('asd')
}
function Reletive_movement(name,is_up){
    console.log('asd')
}
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
