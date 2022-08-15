const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const port = 8080;
var hash = require("object-hash");

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/views/index.html"));
});

// mine
var http = require("http"); //
var server = http.createServer(app); //
var io = require("socket.io")(server); //
server.listen(port); //
console.log("server strarted on port: " + port);
// var socket = require('socket.io');
// var io = socket.listen(app);
io.sockets.on("connection", function (ClientSocket) {
  console.log("connection");

  ClientSocket.on("login", function (data) {
    console.log("got login");
    var _username = data.username;
    var password = data.password;
    var is_admin = data.is_admin;
    console.log(_username + " logged in");
    autheticateUser(_username, password);
  });

  ClientSocket.on("sign-up", function (data) {
    console.log("got sign-up");
    var _username = data.username;
    var password = data.password;
    var is_admin = data.is_admin;
    createUser(_username, password);
  });

  ClientSocket.on("getUser", function (data) {
    console.log('got "getUser"');
    var _username = data.username;
    getUser(_username);
  });

  ClientSocket.on("addMovie", function (data) {
    console.log('got "addMovie"');
    var userName = data.userName;
    var movieName = data.movieName;
    var description = data.description;
    var locations = data.locations;
    var trailer = data.trailer;
    var rate = data.rate;
    var duration = data.duration;
    var director = data.director;
    var stars = data.stars;
    var img = data.img;
    addMovie(
      userName,
      movieName,
      description,
      locations,
      trailer,
      rate,
      duration,
      director,
      stars,
      img
    );
  });
});

app.post("");

const { MongoClient, ServerApiVersion } = require("mongodb");
const { json } = require("stream/consumers");
const { dir } = require("console");
const uri =
  "mongodb+srv://Shaharkozi:S123456@gigos.kdk9a.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.post("/login", (req, res) => {
  var user_name = req.body.user;
  var password = req.body.password;
  console.log(req.query);
  console.log("User name = " + user_name + ", password is " + password);
  res.end("yes");
});

//Admin test
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public/views/admin.html"));
});

// app.listen(port, () => console.info("Listening on port " ,port));

//-----------DataBase Functions------------//

function createUser(userName, password, res) {
  //helper function for signup
  const users = client.db("gigos").collection("users");
  var pass = hash(password);
  const doc = {
    userName: userName,
    password: pass,
    isAdmin: false,
  };
  const valid = {
    userName: userName,
  };
  users.findOne(valid, function (err, result) {
    if (err) throw err;
    if (result != null) {
      // res.send("this user name is not available")
      console.log("client alredy sign up before");
      io.sockets.emit("sign-up", { is_valid: false }); //******
      return;
    } else console.log("client sign up NOW");
    users.insertOne(doc);
    io.sockets.emit("sign-up", { is_valid: true }); //******
  });
}

function autheticateUser(userName, password, res) {
  //pull thr data from DB for the /get/authenticateUsre
  const users = client.db("gigos").collection("users");
  var pass = hash(password);
  const doc = {
    userName: userName,
    password: pass,
  };
  users.findOne(doc, function (err, result) {
    if (err) throw err;
    if (result != null) {
      // res.send(JSON.parse(
      //   '{"isExist": "true"}'
      // ))
      console.log("client is valid and may log in");
      io.sockets.emit("login", { is_valid: true, userName: userName });
    } else {
      // res.send(JSON.parse(
      //   '{"isExist": "false"}'
      // ))
      console.log("client isnt valid and cant log in");
      io.sockets.emit("login", { is_valid: false });
    }
  });
}

function getUser(userName, res) {
  //pull thr data from DB for the /get/user
  console.log("inside getUser");
  const users = client.db("gigos").collection("users");
  const doc = {
    userName: userName,
  };
  users.findOne(doc, function (err, result) {
    if (err) throw err;
    if (result == null) {
      //   res.send(JSON.parse(
      //     '{"userName": "this user is not exist"}'
      //  ))
      console.log("user not found");
      io.sockets.emit("getUser", { user: null });
      return;
    } else {
      // res.send(result)
      console.log("user found");
      io.sockets.emit("getUser", { user: result });
    }
  });
}

function addMovie(
  userName,
  movieName,
  description,
  locations,
  trailer,
  rate,
  duration,
  director,
  stars,
  img,
  res
) {
  //helper function for signup
  const users = client.db("gigos").collection("users");
  const movies = client.db("gigos").collection("movies");
  const user = {
    userName: userName,
  };
  const movie = {
    movieName: movieName,
    description: description,
    locations: locations,
    trailer: trailer,
    rate: rate,
    duration: duration,
    director: director,
    stars: stars,
    img: img,
  };
  users.findOne(user, function (err, result) {
    if (err) throw err;
    if (result.isAdmin) {
      movies.findOne(movie, function (err, result) {
        if (err) throw err;
        if (result != null) {
          console.log("this movie is already exist");
          io.sockets.emit("addMovie", { result: false });
          return;
          // res.send("this movie is already exist")
        } else {
          console.log("insert new movie");
          movies.insertOne(movie);
        }
        io.sockets.emit("addMovie", { result: true });
        return;
      });
    } else return null;
  });
}

function getMovie(movieName, res) {
  //helper function for signup
  const movies = client.db("gigos").collection("movies");
  const movie = {
    movieName: movieName,
  };
  movies.findOne(movie, function (err, result) {
    if (err) throw err;
    if (result != null) {
      res.send(result);
    } else res.send("this movie is not exist");
  });
}

async function getAllMovies(res) {
  //helper function for signup
  var movies = await client.db("gigos").collection("movies").find().toArray();
  res.send(movies);
}

async function getFirstsMovies(num, res) {
  //helper function for signup
  var movies = await client
    .db("gigos")
    .collection("movies")
    .find()
    .limit(Number.parseInt(num))
    .toArray();
  res.send(movies);
}

function rate(movieName, userName, newRate) {
  //functionality of update rate
  const movies = client.db("gigos").collection("movies");
  const movie = {
    movieName: movieName,
  };
  movies.findOne(movie, async function (err, result) {
    //find the movie that we want to update his rate
    if (err) throw err;
    if (result != null) {
      //if the movie exist
      var jsonRate = JSON.parse(result.rate); //take the json of the rate value
      var tRate = 0; //calculate the new total rate
      var i = 0;
      for (var key of Object.keys(jsonRate)) {
        //iterate over all the rating values
        if (key != "totalRate") {
          i++;
          tRate += Number.parseFloat(jsonRate[key]);
        }
      }
      i++;
      tRate += Number.parseFloat(newRate);
      tRate /= i;
      jsonRate["totalRate"] = tRate; //assign the new totalRate to the json
      jsonRate[userName] = newRate; //append the new rating to json
      result.rate = JSON.stringify(jsonRate);
      var movie = {
        movieName: movieName,
      };
      var newValues = { $set: result };
      client
        .db("gigos")
        .collection("movies")
        .updateOne(movie, newValues, function (err, res) {
          //update the values at the DB
          if (err) throw err;
          console.log("1 document updated");
        });
    } else return; //if the movie dont exist return
  });
}

app.post("/signUp", (req, res) => {
  //req  parameters:  userName and password.isAdmin is false always if the user name is already exist return res = "this user name is not available"
  createUser(req.query.userName, req.query.password, res);
});

app.get("/authenticateUsre", (req, res) => {
  //get the parameters:  userName and password. return Json key: "isExist": value:false/true
  autheticateUser(req.query.userName, req.query.password, res);
});

app.get("/user", (req, res) => {
  //get the parameters:  userName . return Json of the user, if user is not exist return this Json {     key:"userName": value:"this user is not exist" }
  getUser(req.query.userName, res);
});

app.post("/addMovie", (req, res) => {
  //req  parameters:  user name, movieName, description, locations, trailer, rate,duration, director, stars, img. if the movie is already exist return res = "this movie is already exist", case that the user is not admin return none
  addMovie(
    req.query.userName,
    req.query.movieName,
    req.query.description,
    req.query.locations,
    req.query.trailer,
    req.query.rate,
    req.query.duration,
    req.query.director,
    req.query.stars,
    req.query.img,
    res
  );
});

app.get("/movie", (req, res) => {
  //req  parameters:  movieName. if the movie is not exist return res = "this movie is not exist", else return the movie
  getMovie(req.query.movieName, res);
});

app.get("/allMovies", (req, res) => {
  //req  parameters:  none
  getAllMovies(res);
});

app.get("/firstMovies", (req, res) => {
  //req  parameters:  number of the firsts
  getFirstsMovies(req.query.num, res);
});

app.post("/rate", (req, res) => {
  //req  parameters:  movieName, userName, rate
  rate(req.query.movieName, req.query.userName, req.query.rate, res);
});
