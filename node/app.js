#!/usr/bin/env node
const hostname = '163.13.164.145';
const username = 'iclab'
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
  console.log("Server started at port 8082");
});

//socket io
const socket = require('socket.io')
const io = socket(server);




//rosnodejs
const rosnodejs = require('rosnodejs');

const std_msgs = rosnodejs.require('std_msgs').msg;
const listener_node=rosnodejs.initNode('/listener_node')

const topics = ['/my_topic','/my_topic2']

listener_node.then((rosNode) => {
  
      let sub = rosNode.subscribe(
        '/cmd_vel',
        'geometry_msgs/Twist',
        (data) => {
            console.log('SUB DATA : ', data);
              io.emit('/mesege', data);           
        },
        {queueSize: 1,
         throttleMs: 10});

         let pub = rosNode.advertise( '/cmd_vel','geometry_msgs/Twist', {
          queueSize: 1,
          latching: true,
          throttleMs: 10
        }); 
        const onConnection = (socket) => {
          console.log('Socket.io init success')
          socket.on('cmd_vel',function(data){
          pub.publish(data);
          })
        };
        io.on("connection", onConnection);
})


