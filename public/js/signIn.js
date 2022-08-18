// import mySocket2 from './index.js';
// var adduser  = require('app.js');
var url = "https://localhost:8080";
//
// var mainIndex = require('./index');
// socket = mainIndex.serverSocket;
// gapi.load('auth2',function(){
//   gap.auth2.init();
// });
// console.log(mySocket2.id);


function func(){
    alert(1);
}
//


function httpPostRequest(username,email){
let xhr = new XMLHttpRequest();
xhr.open("POST",url + '/login');
console.log(url + '/login');
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onload = () => console.log(xhr.responseText);

console.log("bef");

let myData = new Object();
    myData.username = username; 
    myData.email = email;

// let data = `{
//   "Id": 78912,
//   "Customer": "Jason Sweet",
// }`;

xhr.body = JSON.stringify(myData);
console.log("af");
xhr.send(JSON.stringify(myData));
}

// function Login(){
//     var username = document.getElementById("username").value;
//     var email = document.getElementById("email").value;
//     httpPostRequest(username,email);
// }

// function SignUpPage(){
//     // $(document).ready(function(){
//     //     $(".content").load("views/SignUp.html"); 
//     // });
    
//     $(".content").load("views/SignUp.html"); 
// }

function NewLogin(){
    // get the username, password
    username = document.getElementById('username').value;
    password = document.getElementById('Password').value;
    is_admin = false;
    // var result = adduser(username,password,is_admin);
    if(result == true){
        // switch to the main page
        $(".content").load("views/main.html");
    }
    else{

        // write down to sign up or unmatched username/password
    }
}

//
// var io = require('socket.io');
// LoadConnection();
// mySocket = socket;

// function LoadConnection(){
//     console.log('here');
//     mySocket = io.connect('http://localhost:8080');
// }

function myLoginIn(){
    console.log('pressed login');
    username = document.getElementById('username').value;
    password = document.getElementById('Password').value;
    is_admin = false;
    mySocket.emit('login-in',username,password,is_admin);
}

// mySocket.on('login-in', function(is_valid) {
//     if(is_valid==true){ 
//         //change page
//     }
//     // do something
// });
//


// *******************************************

function Login(_userame,_password,_isAdmin){
    socket.emit("login", {
        username: _userame,
        password: _password,
        is_admin: _isAdmin
      });
}

function LoginButton(){
    console.log("pressed login2");
    var username = document.getElementById("username").value;
    var password = document.getElementById("Password").value;
    console.log(
      "from index.js: username is: " + username + " password is:" + password
    );
    var is_admin = false;
    Login(username,password,is_admin);
}


function getUser(username) {
    socket.emit("getUser", {
      username: username,
    });
  }

  function HideLi() {
    sessionStorage.setItem('user',JSON.stringify(ClientUser));
    console.log(sessionStorage.getItem('user'));
    console.log('saved the session of the user')
    // $('#top-bar')
    $("#sign-up").remove();
    $("#sign-in").remove();
    // if admin add li of admin
    if(IsAdmin(ClientUser)==true){
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
    mainPage();
    // if its admin show admin
  }


  
  function ShowLi() {
    if(IsAdmin(ClientUser)==true){
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
    ClientUser = null;
    // remove admin
  }

  function IsAdmin(user){
    if(user.isAdmin == true){
      return true;
    }
    return false;
  }

  function mainPage(){
    $("#content").load("views/main.html");
  }

  // function onSignIn(googleUser) {
  //   console.log("here google");
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  //   var name = profile.getName();
  //   var id_token = googleUser.getAuthResponse().id_token;

  // }

  // function onSignIn(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }

  // function signOut() {
  //   var auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(function () {
  //     console.log('User signed out.');
  //   });
  // }
