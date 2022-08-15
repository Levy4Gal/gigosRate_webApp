// const e = require("express");

// var isSignUp = false;

function SignUpPage() {
  $(document).ready(function () {
    $("#content").load("views/SignUp.html");
  });

  // $(".content").load("views/SignUp.html");
}

function SignInPage() {
  $("#content").load("views/signIn.html");
}

function AdminPage() {
  $("#content").load("views/admin.html");
}

// function ConnectToServer(){
//     socket = io.connect('http://localhost:8080');
// }

var socket = io.connect("http://localhost:8080");
console.log("client connected");

function myLoginIn2() {
  console.log("pressed login2");
  username = document.getElementById("username").value;
  password = document.getElementById("Password").value;
  console.log(
    "from index.js: username is: " + username + " password is:" + password
  );
  // console.log(username);
  // console.log(password);
  is_admin = false;
  socket.emit("login", {
    username: username,
    password: password,
    is_admin: is_admin,
  });
  console.log("sent login emit");
}

socket.on("login", function (data) {
  if (data.is_valid == true) {
    console.log("client is valid");
    HideLi();
    getUser(data.userName);
    // socket.emit('getUser',{
    //     username:data.userName,
    // });
  } else {
    console.log("client isn't valid");
  }
});

// exports.serverSocket = socket;

// export default socket;
// export {SignInPage,SignUpPage};

function mySignUp2() {
  console.log("pressed sign up 2");
  username = document.getElementById("username").value;
  password = document.getElementById("firstPassword").value;
  console.log(
    "from index.js - sign up: username is: " +
      username +
      " password is:" +
      password
  );
  // console.log(username);
  // console.log(password);
  is_admin = false;
  socket.emit("sign-up", {
    username: username,
    password: password,
    is_admin: is_admin,
  });
  console.log("sent sign-up emit");
}

socket.on("sign-up", function (data) {
  console.log("inside the sign-up on of the client");
  if (data.is_valid == true) {
    console.log("client is now sign-up");
    // HideLi();
  } else {
    console.log("client is already signed up");
  }
});

var ClientUser;

function getUser(username) {
  socket.emit("getUser", {
    username: username,
  });
}

socket.on("getUser", function (data) {
  console.log("inside the sign-up on of the client");
  if (data.user == null) {
    console.log("user not found");
    // HideLi();
  } else {
    console.log("user found");
    ClientUser = data.user;
    console.log(ClientUser.userName);
    console.log(ClientUser.password);
    console.log(ClientUser.isAdmin);
  }
});

socket.on("addMovie", function (data) {
  console.log("inside the addMovie on of the client");
  if (data.result == true) {
    console.log("movie added");
    // HideLi();
  } else {
    console.log("movie already exist");
  }
});

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
  img
) {
  socket.emit("addMovie", {
    userName: userName,
    movieName: movieName,
    description: description,
    locations: locations,
    trailer: trailer,
    rate: rate,
    duration: duration,
    director: director,
    stars: stars,
    img: img,
  });
}

function myFunc() {
  addMovie(
    "beni",
    "Mickey Mouse",
    "blbla",
    '["1","2"]',
    "http...",
    '{"user1":3,"user2":4,"totalRate":3,"gal":"2"}',
    "120",
    "Yanon",
    "Gal Levy",
    "Link..."
  );
}

function HideLi() {
  // $('#top-bar')
  $("#sign-up").remove();
  $("#sign-in").remove();
  // if admin add li of admin
  $("#top-bar").append(
    '<li id="sign-out" onclick="ShowLi()"><a>Sign out</a></li>'
  );
  // if its admin show admin
}

function ShowLi() {
  $("#sign-out").remove();
  $("#top-bar").append(
    '<li id="sign-up" onclick="SignUpPage()"><a>Sign up</a></li>'
  );
  $("#top-bar").append(
    '<li id="sign-in" onclick="SignInPage()"><a>Sign in</a></li>'
  );
  // remove admin
}
