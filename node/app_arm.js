#!/usr/bin/env node
function getIPAdress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
      var iface = interfaces[devName];
      for (var i = 0; i < iface.length; i++) {
          var alias = iface[i];
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
              return alias.address;
          }
      }
  }
}
const hostname = getIPAdress();
const username = require('os').userInfo().username
const express = require('express');
const path = require('path');
const http = require('http')
const port = process.env.PORT || 3001; 
const app = express();
// const server = http.createServer(app)

// Routing
app.use(express.static(path.join(__dirname, '..'))); 
app.get('/', function (req, res) {
  app.use(express.static(path.resolve(__dirname, '..')));
  res.sendFile(path.resolve(__dirname, '..', 'index.html'));
});


app.listen(3000,hostname, function (req, res) {
  console.log("Server started at port 3000");
});



const { Client } = require('pg')
const client = new Client({
  user: username,
  host: 'localhost',
  database: 'web',
  password: 'aa',
  port: 5432,
})
client.connect(function(err) {
  if (err) {console.log("server can't connect")}
  else{
    console.log("SQL Connected!");
    app.get('/data', async (req, res)=> {
  const rows = await readTodos("talk"); 
  res.send(rows);
});

app.post("/data", async (req, res) => {
  let result = {}

  try{
      const reqJson = req.body;
      console.log(reqJson.talk)
      result.success = await createTodo("talk",reqJson.talk)
      
  }
  catch(e){
      result.success=false;
  }
  finally{
      res.setHeader("content-type", "application/json")
      res.send(JSON.stringify(result))
      
  }
 
})

app.delete("/data", async (req, res) => {
  let result = {}
  try{

      const reqJson = req.body;
      result.success = await deleteTodo("talk","name",reqJson.talk)
  }
  catch(e){
      result.success=false;
  }
  finally{
      res.setHeader("content-type", "application/json")
      res.send(JSON.stringify(result))
  }
 
})
  }
  
  // Read()
});

async function readTodos(database) {
  try {
  const results = await client.query("SELECT * FROM "+database);
  return results.rows;
  }
  catch(e){
      return [];
  }
}

async function createTodo(database,todoText){
  try {
      await client.query("INSERT INTO "+database+" VALUES"+ todoText);
      return true
      }
      catch(e){
        return false;
      }
}
async function deleteTodo(database,deletename,todoText){

  try {
      console.log(database,todoText)
      await client.query("delete from "+database+" where "+deletename+" = "+ todoText);
      return true
      }
      catch(e){
        return false;
      }
}
path.resolve(__dirname,'ssl/server-cert.pem')
//https
var https = require('https');
var fs = require('fs');
var options = {
  key: fs.readFileSync(path.resolve(__dirname, 'ssl/server-key.pem')),
  ca: [fs.readFileSync(path.resolve(__dirname, 'ssl/cert.pem'))],
  cert: fs.readFileSync(path.resolve(__dirname,'ssl/server-cert.pem'))
};

server = https.createServer(options, app)

server.listen(3001,hostname, function (req, res) {
  console.log("https://"+hostname+":3001");
});

//socket io
const socket = require('socket.io')
const io = socket(server);




//rosnodejs
const rosnodejs = require('rosnodejs');

const std_msgs = rosnodejs.require('std_msgs').msg;
const listener_node=rosnodejs.initNode('/my_node', {onTheFly: true})
const nh = rosnodejs.nh;
const topics = ['/my_topic','/my_topic2']

listener_node.then((rosNode) => {
        let sub = rosNode.subscribe(
          '/left_arm/status',
          'robotis_controller_msgs/StatusMsg',
          (data) => {
                io.emit('/left_arm/status', data.status_msg);           
          },
          {queueSize: 1,
          throttleMs: 10});
        let sub2 = rosNode.subscribe(
          '/right_arm/status',
          'robotis_controller_msgs/StatusMsg',
          (data) => {
                io.emit('/right_arm/status', data.status_msg);           
          },
          {queueSize: 1,
          throttleMs: 10});  
        let joint_pose_msg_l = rosNode.advertise( '/left_arm/joint_pose_msg','manipulator_h_base_module_msgs/JointPose', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        });
        let joint_pose_msg_r = rosNode.advertise( '/right_arm/joint_pose_msg','manipulator_h_base_module_msgs/JointPose', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        });
        let slide_command_msg_l = rosNode.advertise( '/left_arm/slide_command_msg','manipulator_h_base_module_msgs/SlideCommand', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        });
        let slide_command_msg_r = rosNode.advertise( '/right_arm/slide_command_msg','manipulator_h_base_module_msgs/SlideCommand', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        }); 
        let specific_pose_ms_l = rosNode.advertise( '/left_arm/specific_pose_msg','std_msgs/String', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        });
        let specific_pose_ms_r = rosNode.advertise( '/right_arm/specific_pose_msg','std_msgs/String', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        }); 
        let kinematics_pose_msg_l = rosNode.advertise( '/left_arm/kinematics_pose_msg','manipulator_h_base_module_msgs/KinematicsPose', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        });
        let kinematics_pose_msg_r = rosNode.advertise( '/right_arm/kinematics_pose_msg','manipulator_h_base_module_msgs/KinematicsPose', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        }); 
        let p2p_pose_msg_l = rosNode.advertise( '/left_arm/p2p_pose_msg','manipulator_h_base_module_msgs/P2PPose', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        });
        let p2p_pose_msg_r = rosNode.advertise( '/right_arm/p2p_pose_msg','manipulator_h_base_module_msgs/P2PPose', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        }); 
        let grap_alcohol_msg_l = rosNode.advertise( '/left_arm/grap_alcohol_msg','std_msgs/String', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        });
        let grap_alcohol_msg_r = rosNode.advertise( '/right_arm/grap_alcohol_msg','std_msgs/String', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        }); 
        let release_pose_msg_l = rosNode.advertise( '/left_arm/release_pose_msg','std_msgs/String', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        });
        let release_pose_msg_r = rosNode.advertise( '/right_arm/release_pose_msg','std_msgs/String', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        }); 
        let set_mode_msg_l = rosNode.advertise( '/left_arm/set_mode_msg','std_msgs/String', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        });
        let set_mode_msg_r = rosNode.advertise( '/right_arm/set_mode_msg','std_msgs/String', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        }); 
        let sucker_on_l = rosNode.advertise( '/left_arm/sucker_on_msg','std_msgs/String', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        });
        let sucker_on_r = rosNode.advertise( '/right_arm/sucker_on_msg','std_msgs/String', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        }); 
        let sucker_off_l = rosNode.advertise( '/left_arm/sucker_off_msg','std_msgs/String', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        });
        let sucker_off_r = rosNode.advertise( '/right_arm/sucker_off_msg','std_msgs/String', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        }); 
        let get_kinematics_pose_l = rosNode.serviceClient('/left_arm/get_kinematics_pose','manipulator_h_base_module_msgs/GetKinematicsPose');
        let get_kinematics_pose_r = rosNode.serviceClient('/right_arm/get_kinematics_pose','manipulator_h_base_module_msgs/GetKinematicsPose');
        let get_joint_pose_l = rosNode.serviceClient('/left_arm/get_joint_pose','manipulator_h_base_module_msgs/GetJointPose');
        let get_joint_pose_r = rosNode.serviceClient('/right_arm/get_joint_pose','manipulator_h_base_module_msgs/GetJointPose');

        const onConnection = (socket) => {
          console.log('Socket.io init success')
          //topic
          socket.on('/left_arm/joint_pose_msg',function(data){
          joint_pose_msg_l.publish(data);
          console.log(data)
          })
          socket.on('/right_arm/joint_pose_msg',function(data){
            joint_pose_msg_r.publish(data);
            console.log(data)
          })
          socket.on('/left_arm/slide_command_msg',function(data){
            slide_command_msg_l.publish(data);
            console.log(data)
          })
          socket.on('/right_arm/slide_command_msg',function(data){
            slide_command_msg_r.publish(data);
            console.log(data)
          })
          socket.on('/left_arm/specific_pose_msg',function(data){
            specific_pose_ms_l.publish(data);
            console.log(data)
          })
          socket.on('/right_arm/specific_pose_msg',function(data){
            specific_pose_ms_r.publish(data);
            console.log(data)
          })
          socket.on('/left_arm/kinematics_pose_msg',function(data){
            kinematics_pose_msg_l.publish(data);
            console.log(data)
          })
          socket.on('/right_arm/kinematics_pose_msg',function(data){
            kinematics_pose_msg_r.publish(data);
            console.log(data)
          })

          socket.on('/left_arm/release_pose_msg',function(data){
            release_pose_msg_l.publish(data);
            console.log(data)
          })
          socket.on('/right_arm/release_pose_msg',function(data){
            release_pose_msg_r.publish(data);
            console.log(data)
          })
          socket.on('/left_arm/set_mode_msg',function(data){
            set_mode_msg_l.publish(data);
            console.log(data)
          })
          socket.on('/right_arm/set_mode_msg',function(data){
            set_mode_msg_r.publish(data);
            console.log(data)
          })
          socket.on('/left_arm/p2p_pose_msg',function(data){
            p2p_pose_msg_l.publish(data);
            console.log(data)
          })
          socket.on('/right_arm/p2p_pose_msg',function(data){
            p2p_pose_msg_r.publish(data);
            console.log(data)
          })
          socket.on('/left_arm/grap_alcohol_msg',function(data){
            grap_alcohol_msg_l.publish(data);
            console.log(data)
          })
          socket.on('/right_arm/grap_alcohol_msg',function(data){
            grap_alcohol_msg_r.publish(data);
            console.log(data)
          })

          socket.on('/left_arm/sucker_on_msg',function(data){
            grap_alcohol_msg_l.publish(data);
            console.log(data)
          })
          socket.on('/right_arm/sucker_on_msg',function(data){
            grap_alcohol_msg_r.publish(data);
            console.log(data)
          })
          socket.on('/left_arm/sucker_off_msg',function(data){
            grap_alcohol_msg_l.publish(data);
            console.log(data)
          })
          socket.on('/right_arm/sucker_off_msg',function(data){
            grap_alcohol_msg_r.publish(data);
            console.log(data)
          })
          ///service
          socket.on('/left_arm/get_kinematics_pose',function(data,callback){
            get_kinematics_pose_l.call(data).then((resp) => {
              try{
                callback(resp);
              }
              catch(error) {
                callback(error);
            }
            });
          })
          socket.on('/right_arm/get_kinematics_pose',function(data,callback){
            get_kinematics_pose_r.call(data).then((resp) => {
              try{
                callback(resp);
              }
              catch(error) {
                callback(error);
            }
            });
          })
          socket.on('/left_arm/get_joint_pose',function(data,callback){
            get_joint_pose_l.call(data).then((resp) => {
              try{
                callback(resp);
              }
              catch(error) {
                callback(error);
            }
            });
          })
          socket.on('/right_arm/get_joint_pose',function(data,callback){
            get_joint_pose_r.call(data).then((resp) => {
              try{
                callback(resp);
              }
              catch(error) {
                callback(error);
            }
            });
          })
          ///ping
          socket.on('ping',function(callback){
            callback()
           })
           ///測試專區
          socket.on('test',function(data,callback){
            serviceClient.call({'a':data.a,'b':data.b}).then((resp) => {
              console.log('Service response ' + JSON.stringify(resp.sum));
              try{
                callback(resp);
              }
              catch(error) {
                callback(error);
            }
            });
            })
        };
        io.on("connection", onConnection);
})


