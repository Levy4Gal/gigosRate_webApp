const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const port = 8080;
var hash = require('object-hash');

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/views/SignIn.html"));
});

app.post("")

const { MongoClient, ServerApiVersion } = require('mongodb');
const { json } = require("stream/consumers");
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
      const users = client.db("gigos").collection("users");
      var pass = hash(password);
      const doc = {
        "userName":userName,
        "password": pass,
        "isAdmin":isAdmin
      }
      users.insertOne(doc);
      setTimeout(()=> client.close(),1500);
  }

   function autheticateUser(userName, password ,res) {//pull thr data from DB for the /get/authenticateUsre
      const users = client.db("gigos").collection("users");
      var pass = hash(password);
      const doc = {
        "userName":userName,
        "password": pass,
      }
      users.findOne(doc, function(err, result){
        if(err) throw err;
        if(result != null){
          res.send(JSON.parse(
            '{"isExist": "true"}'
          ))
        }else 
          res.send(JSON.parse(
            '{"isExist": "false"}'
          ))
        });
   }

   function getUser(userName ,res) {//pull thr data from DB for the /get/user
    const users = client.db("gigos").collection("users");
    const doc = {
      "userName":userName
    }
    users.findOne(doc, function(err, result){
      if(err) throw err;
      if(result == null)
        res.send(JSON.parse(
          '{"userName": "this user is not exist"}'
       ))
      else
        res.send(result)});
 }


app.get("/authenticateUsre", (req, res) => {//get the parameters:  userName and password. return Json key: "isExist": value:false/true
  console.log(req.query.userName);
  console.log(req.query.password);
  autheticateUser(req.query.userName,req.query.password, res);
});

app.get("/user", (req, res) => {//get the parameters:  userName and password. return Json key: "isExist": value:false/true
  console.log(req.query.userName);
  getUser(req.query.userName, res);
});

//Admin test
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public/views/admin.html"));
});


app.listen(port, () => console.info("Listening on port " ,port));
