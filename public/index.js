// const e = require("express");

var isSignUp = false;

function SignUpPage(){
    $(document).ready(function(){
        $(".content").load("views/SignUp.html"); 
    });
    
    // $(".content").load("views/SignUp.html"); 
}

function SignInPage(){
    $(".content").load("views/signIn.html"); 
}

// function ConnectToServer(){
//     socket = io.connect('http://localhost:8080');
// }

var socket = io.connect('http://localhost:8080');
console.log("client connected");

function myLoginIn2(){
    console.log('pressed login2');
    username = document.getElementById('username').value;
    password = document.getElementById('Password').value;
    console.log("from index.js: username is: " + username + " password is:" + password);
    // console.log(username);
    // console.log(password);
    is_admin = false;
    socket.emit('login',{
        username:username,
        password:password,
        is_admin:is_admin
    });
    console.log("sent login emit");
}

socket.on('login',function(data){
    if(data.is_valid == true)
    {
        console.log("client is valid");
        HideLi();
    }
    else{
        console.log("client isn't valid");
    }
});

// exports.serverSocket = socket;

// export default socket;
// export {SignInPage,SignUpPage};

function mySignUp2(){
    console.log('pressed sign up 2');
    username = document.getElementById('username').value;
    password = document.getElementById('firstPassword').value;
    console.log("from index.js - sign up: username is: " + username + " password is:" + password);
    // console.log(username);
    // console.log(password);
    is_admin = false;
    socket.emit('sign-up',{
        username:username,
        password:password,
        is_admin:is_admin
    });
    console.log("sent sign-up emit");
}

socket.on('sign-up',function(data){
    if(data.is_valid == true)
    {
        console.log("client is sign-up");
        ShowLi();
    }
    else{
        console.log("client isn't sign-up");
    }
});

function HideLi(){
    console.log('inside hide');
    // $('#top-bar')
    $("#sign-up").remove();
    $("#sign-in").remove();
    $("#top-bar").append("<li id=\"sign-out\" onclick=\"ShowLi()\"><a>Sign out</a></li>");
    // if its admin show admin 
}

function ShowLi(){
    console.log('inside hide');
    $("#sign-out").remove();
    $('#top-bar').append("<li id=\"sign-up\" onclick=\"SignUpPage()\"><a>Sign up</a></li>");
    $('#top-bar').append("<li id=\"sign-in\" onclick=\"SignInPage()\"><a>Sign in</a></li>");
    // remove admin
}

