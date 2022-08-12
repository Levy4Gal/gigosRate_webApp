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
app.listen(port, () => console.info("Listening on port ", port ));


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

