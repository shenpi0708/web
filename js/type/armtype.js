var JointPose = {

    name: ['r_joint1', 'r_joint2', 'r_joint3','r_joint4', 'r_joint5', 'r_joint6', 'r_joint7'],
    position: [0,0,0, 0,0, 0, 0],
    velocity: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    effort: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
}

var string = {
    data: ""
}
var slidetype = {
    pos: 0
}
var P2PPose = {
    name: "arm",
    pose:'',
    position:'',
    x: 0,
    y: 0,
    z: 0.0,
    orientation:'',
    x: 0,
    y: 0,
    z: 0,
    w: 0.0,
    phi: 0.0,
    speed: 10
}