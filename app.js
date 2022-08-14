const express = require("express"); //
const bodyParser = require("body-parser");
const app = express(); //
const path = require("path"); //
const port = 8080; //
var hash = require('object-hash');

// hellooooo

//
var http = require('http') //
var server = http.createServer(app) //
var io = require('socket.io')(server); //
server.listen(port); //
console.log('server strarted on port: '+ port);
// var socket = require('socket.io');
// var io = socket.listen(app);
io.sockets.on('connection', function (ClientSocket) {
  console.log("connection");
  
  ClientSocket.on('login', function(data){
    console.log('got login');
    var _username = data.username;
    var password = data.password;
    var is_admin = data.is_admin;
    console.log(_username + " logged in");
    // var isValid = addUser(_username, password, is_admin);
  // io.sockets.emit('login-in',isValid);
  // add io.socket.on("login-in") inside the login html
  io.sockets.emit('login',{is_valid:true});})

  ClientSocket.on('sign-up', function(data){
    console.log('got sign-up');
    var _username = data.username;
    var password = data.password;
    var is_admin = data.is_admin;
    console.log(_username + " is sign-up");
    // var isValid = addUser(_username, password, is_admin);
  // io.sockets.emit('login-in',isValid);
  // add io.socket.on("login-in") inside the login html
  io.sockets.emit('sign-up',{is_valid:true});})
});
  



app.use(express.json());
app.use(express.static("public"));

app.set('views','./public/views');

app.get("/", (req, res) => {
  console.log('sent landing page');
  res.sendFile(path.join(__dirname, "public/views/index.html"));
  // res.sendFile(path.join(__dirname, "public/views/main.html"));
});

app.post("")

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Shaharkozi:S123456@gigos.kdk9a.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.post("/login",(req, res) => {
  var user_name = req.body.user;
  var password = req.body.password;
  console.log(req.query);
  console.log("User name = "+user_name+", password is "+password);
  res.end("yes");
  });

  //-----------DataBase Functions------------//
  

  function addUser(userName, password, isAdmin){
    client.connect( err => {
      const users = client.db("gigos").collection("users");
      var pass = hash(password);
      const doc = {
        "userName":userName,
        "password": pass,
        "isAdmin":isAdmin
      }
      users.insertOne(doc);
      setTimeout(()=> client.close(),1500);
    });
  }
  
  // addUser("Guy","Guy");
  async function autheticateUser(userName, password ,callback) {
    try {
      client.connect(async err => {
        const users = client.db("gigos").collection("users");
        var pass = hash(password);
        const doc = {
          "userName":userName,
          "password": pass,
        }
        const res =await users.findOne(doc);
        callback(res);
        setTimeout(()=> client.close(),1500);
      });
    } finally {
      await client.close();
    }
  }
  function test(value){
    console.log(value);
  }
  autheticateUser("Guy","Guy", test);

//Admin test
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public/views/admin.html"));
});




// app.listen(port, () => console.info("Listening on port " ,port));

