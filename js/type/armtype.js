var JointPose = {
    name: ['joint1','joint2','joint3', 'joint4', 'joint5', 'joint6', 'joint7'],
    value: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    slide_pos: 0.0,
    speed: 10
}

var string = {
    data: ""
}
var slidetype = {
    pos: 0
}
var P2PPose = {
    name: "arm",
    pose:{
        position:{
        x: 0,
        y: 0,
        z: 0.0              
        },
        orientation:{
        x: 0,
        y: 0,
        z: 0,
        w: 0.0,        
        }        
    },

    phi: 0.0,
    speed: 10
}