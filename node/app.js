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
var bodyParser = require('body-parser')
const path = require('path');
const http = require('http')
const port = process.env.PORT || 3001; 
var url = require('url');
const app = express();
// const server = http.createServer(app)

// Routing
app.use(express.static(path.join(__dirname, '..'))); 
app.get('/', function (req, res) {
  app.use(express.static(path.resolve(__dirname, '..')));
  res.sendFile(path.resolve(__dirname, '..', 'index.html'));
});


app.listen(3000,hostname, function (req, res) {
  console.log('http://'+hostname+":3000");
});

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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

app.post("/data", postsql)

async function postsql(req, res){
  let result = {}
  try{
      const reqJson = req.body;
      console.log(typeof(reqJson.talk))
      console.log(reqJson.talk)
      result.success = await createTodo("talk",reqJson.talk)
      // result.success = await createTodo("talk","('wer',"+reqJson.talk+")" ) 
  }
  catch(e){
      result.success=false;
  }
  finally{
      res.setHeader("content-type", "application/json")
      res.send(JSON.stringify(result))
  }
}

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
        console.log(e)
        return false;
      }
}
async function deleteTodo(database,deletename,todoText){

  try {
      //console.log(database,todoText)
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
  console.log('https://'+hostname+":3001");
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
  
      ///////////////////SQL//////////////
      let chat = rosNode.subscribe(
        '/chat',
        'std_msgs/String',
        async (res)=>{
          result=[]
          try{
              const reqJson = res.data;
              console.log(typeof(res.data))
              console.log(reqJson)
              result.success = await createTodo("talk",reqJson)            
              io.emit('chat', "ok"); 
          }
          finally{
            console.log(result+'error')
          }
          
        },
        {queueSize: 1,
         throttleMs: 10});      

      ////////////////////////////////////
      
      let sub = rosNode.subscribe(
        '/cmd_vel',
        'geometry_msgs/Twist',
        (data) => {
            //console.log('SUB DATA : ', data);
              io.emit('/mesege', data);           
        },
        {queueSize: 1,
         throttleMs: 10});

       rosNode.subscribe(
          '/mobile_position',
          'geometry_msgs/Twist',
          (data) => {
              //console.log('SUB DATA : ', data);
                io.emit('mobile_position', data);           
          },
          {queueSize: 1,
           throttleMs: 10});
           
        let cmd_vel_pub = rosNode.advertise( '/vehicle/cmd_new','geometry_msgs/Twist', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        });
        let robotposition_pub = rosNode.advertise( '/mobile_target_position','geometry_msgs/Twist', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        });

        // let serviceClient = rosNode.serviceClient('/add_two_ints','beginner_tutorials/AddTwoInts');
        // let    = rosNode.waitForService(serviceClient.getService(), 2000)
        //   .then((available) => {
        //     if (available) {
        //       serviceClient.call({'a':1,'b':2}).then((resp) => {
        //         console.log('Service response ' + JSON.stringify(resp.sum));
        //       });
        //     } else {
        //       console.log('Service not available');
        //     }
        //   });
        const onConnection = (socket) => {
          console.log('Socket.io init success')
          socket.on('cmd_vel',function(data){
            cmd_vel_pub.publish(data);
          })

          socket.on('ping',function(callback){
            callback()
           })
          socket.on('robotposition',function(callback){
            robotposition_pub.publish(callback)
          })

          // socket.on('test',function(data,callback){
          //   // pub.publish(data);
          //   serviceClient.call({'a':data.a,'b':data.b}).then((resp) => {
          //     console.log('Service response ' + JSON.stringify(resp.sum));
          //     try{
          //       callback(resp);
          //     }
          //     catch(error) {
          //       callback(error);
          //   }
          //   });
          
          //   })

                  
        };
        io.on("connection", onConnection);
})


