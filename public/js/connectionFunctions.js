function SignUpPage() {
  $(document).ready(function () {
    $("#content").load("views/SignUp.html");
  });
}

function SignInPage() {
  $(document).ready(function () {
    $("#content").load("views/signIn.html");
  });    
}

function AdminPage() {
  $("#content").load("views/admin.html");
}

function MainPageSwitch(){
  $("#content").load("views/main.html");
}

$(document).ready(() => {
  console.log('check if the user is refreshed');
  if(sessionStorage.getItem('user')!=null){
    console.log('after user refresh');
    // if(ClientUser == null){
    //   return;
    // }
    ClientUser = JSON.parse(sessionStorage.getItem('user'));
    console.log('inside the after refresh');
    console.log(ClientUser);
    if(ClientUser!=null){
      $("#sign-up").remove();
      $("#sign-in").remove();
      // if admin add li of admin
      if(ClientUser.isAdmin==true){
        $("#top-bar").append(
          '<li id="admin" onclick="AdminPage()"><a>Admin</a></li>'
        );
      }
      $("#top-bar").append(
        '<li id="sign-out" onclick="ShowLi()"><a>Sign out</a></li>'
      );
      $("#top-bar").append(
        '<li id="watch list" onclick="watchList()"><a>WatchList</a></li>'
      );
    }
  }
  
});

function ShowLi() {
  if(ClientUser.isAdmin==true){
    $("#admin").remove();  
  }
  $("#sign-out").remove();
  $("[id='watch list']").remove();

  $("#top-bar").append(
    '<li id="sign-up" onclick="SignUpPage()"><a>Sign up</a></li>'
  );
  $("#top-bar").append(
    '<li id="sign-in" onclick="SignInPage()"><a>Sign in</a></li>'
  );
  sessionStorage.removeItem('user');
  ClientUser = null;
  MainPageSwitch();
  // remove admin
}


var socket = io.connect("http://localhost:8080");
console.log("client connected");

// function myLoginIn2() {
//   console.log("pressed login2");
//   username = document.getElementById("username").value;
//   password = document.getElementById("Password").value;
//   console.log(
//     "from index.js: username is: " + username + " password is:" + password
//   );
//   is_admin = false;
//   socket.emit("login", {
//     username: username,
//     password: password,
//     is_admin: is_admin,
//   });
//   console.log("sent login emit");
// }


socket.on("login", function (data) {
  if (data.is_valid == true) {
    console.log("client is valid");
    getUser(data.userName);
    // HideLi();
    // socket.emit('getUser',{
    //     username:data.userName,
    // });
  } else {
    console.log("client isn't valid");
    var SignInLabel = document.getElementById("value");
    if(SignInLabel == null){
      $("#respond").append("<p id=\"value\">username/password are incorrect.</p>");
    }
  }
});

// function mySignUp2() {
//   console.log("pressed sign up 2");
//   username = document.getElementById("username").value;
//   password = document.getElementById("firstPassword").value;
//   password2 = document.getElementById("secondPassword").value;
//   if(passwordCheck2(password,password2)==false){
//     SignUpLabel = document.getElementById("value");
//     if(SignUpLabel == null){
//       console.log("here");
//     $("#Sign-Up-Respond").append("<p id=\"value\">username/password are incorrect.</p>");
//     }
//     return;
//   }
//   console.log(
//     "from index.js - sign up: username is: " +
//       username +
//       " password is:" +
//       password
//   );
//   // console.log(username);
//   // console.log(password);
//   is_admin = false;
//   socket.emit("sign-up", {
//     username: username,
//     password: password,
//     is_admin: is_admin,
//   });
//   console.log("sent sign-up emit");
// }

// function passwordCheck2(pas1,pas2){
//   console.log(pas1);
//   console.log(pas2);
//   if(pas1!=pas2){
//       return false;   
//   }
//   return true;
// }

socket.on("sign-up", function (data) {
  console.log("inside the sign-up on of the client");
  if (data.is_valid == true) {
    console.log("client is now sign-up");
    // HideLi();
  } else {
    console.log("client is already signed up");
    var SignUpLabel = document.getElementById("value");
    if(SignUpLabel == null){
      console.log("here");
    $("#Sign-Up-Respond").append("<p id=\"value\">User already exist.</p>");
    }
    else{
      $("p#value").text("User already exist.");
    }
  }
});

var ClientUser;

// function getUser(username) {
//   socket.emit("getUser", {
//     username: username,
//   });
// }

socket.on("getUser", function (data) {
  console.log("inside the sign-up on of the client");
  if (data.user == null) {
    console.log("user not found");
    // HideLi();
  } else {
    console.log("user found");
    ClientUser = data.user;
    if(ClientUser!=null){
      HideLi();
    }
    console.log("user name is: "+ ClientUser.userName);
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

// function myFunc() {
//   addMovie(
//     "beni",
//     "Mickey Mouse",
//     "blbla",
//     '["1","2"]',
//     "http...",
//     '{"user1":3,"user2":4,"totalRate":3,"gal":"2"}',
//     "120",
//     "Yanon",
//     "Gal Levy",
//     "Link..."
//   );
// }

// function HideLi() {
//   // $('#top-bar')
//   $("#sign-up").remove();
//   $("#sign-in").remove();
//   // if admin add li of admin
//   if(IsAdmin(ClientUser)==true){
//     $("#top-bar").append(
//       '<li id="admin" onclick="AdminPage()"><a>Admin</a></li>'
//     );
//   }
//   $("#top-bar").append(
//     '<li id="sign-out" onclick="ShowLi()"><a>Sign out</a></li>'
//   );
//   mainPage();
//   // if its admin show admin
// }

// function ShowLi() {
//   if(IsAdmin(ClientUser)==true){
//     $("#admin").remove();  
//   }
//   $("#sign-out").remove();
//   $("#top-bar").append(
//     '<li id="sign-up" onclick="SignUpPage()"><a>Sign up</a></li>'
//   );
//   $("#top-bar").append(
//     '<li id="sign-in" onclick="SignInPage()"><a>Sign in</a></li>'
//   );
//   ClientUser = null;
//   // remove admin
// }

// function IsAdmin(user){
//   if(user.isAdmin == true){
//     return true;
//   }
//   return false;
// }

// function mainPage(){
//   $("#content").load("views/main.html");
// }
