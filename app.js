const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const path = require("path");
const port = 8080;

app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/views/SignIn"));
});

app.post("")
console.log("here");
app.listen(port, () => console.info("Listening on port ", port ));


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Shaharkozi:S123456@gigos.kdk9a.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

router.post("/login",(req, res) => {
  var user_name = req.body.user;
  var password = req.body.password;
  console.log("User name = "+user_name+", password is "+password);
  res.end("yes");
  });
