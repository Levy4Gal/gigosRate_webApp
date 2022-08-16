// import mySocket2 from './index.js';
// var adduser  = require('app.js');
var url = "https://localhost:8080";
//
// var mainIndex = require('./index');
// socket = mainIndex.serverSocket;

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

function Login(){
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    httpPostRequest(username,email);
}

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
