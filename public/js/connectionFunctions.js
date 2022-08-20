// Create first connection with the server socket io.
var socket = io.connect("http://localhost:8080");
console.log("client connected");

// Switch the page into the sign up page.
function SignUpPage() {
  const url = "http://localhost:8080/sign-up";
  window.location = url;
}

// Switch the page into the sign in page.
function SignInPage() {
  $(document).ready(function () {
    $("#content").load("views/signIn.html");
  });    
}

// Switch the page into the admin page.
function AdminPage() {
  const url = "http://localhost:8080/admin";
  window.location = url;
}

// Switch the page into the main page.
function MainPageSwitch(){
  const url = "http://localhost:8080";
  window.location = url;
}

// Checks if the user already logged after refresh/page swap.
$(document).ready(() => {
  console.log('check if the user is refreshed');
  if(sessionStorage.getItem('user')!=null){
    console.log('after user refresh');
    ClientUser = JSON.parse(sessionStorage.getItem('user'));
    console.log('inside the after refresh');
    console.log(ClientUser);
    if(ClientUser!=null){
      $("#sign-up").remove();
      $("#sign-in").remove();
      if(ClientUser.isAdmin==true){
        $("#top-bar").append(
          '<li id="admin" onclick="AdminPage()"><a>Admin</a></li>'
        );
      }
      $("#top-bar").append(
        '<li id="sign-out" onclick="ShowLi()"><a>Sign out</a></li>'
      );
      $("#top-bar").append(
        '<li id="watch list"><a href="watchlist-view">WatchList</a></li>'
      );
    }
  }
});

  // Show the labels after the user signed out.
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
}

// Handle the login event from the server. 
socket.on("login", function (data) {
  if (data.is_valid == true) {
    console.log("client is valid");
    getUser(data.userName);
  } else {
    console.log("client isn't valid");
    var SignInLabel = document.getElementById("value");
    if(SignInLabel == null){
      $("#respond").append("<p id=\"value\">username/password are incorrect.</p>");
    }
  }
});

// Handle the sign up event from the server. 
socket.on("sign-up", function (data) {
  console.log("inside the sign-up on of the client");
  if (data.is_valid == true) {
    console.log("client is now sign-up");
    const url = "http://localhost:8080";
    window.location = url;
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

// the user object from the DB.
var ClientUser;

// Handle the getUser event from the server. 
socket.on("getUser", function (data) {
  console.log("inside the sign-up on of the client");
  if (data.user == null) {
    console.log("user not found");
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

