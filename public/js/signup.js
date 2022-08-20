// Checks if the passwords are the same.
function passwordCheck(pas1,pas2){
    if(pas1!=pas2){
        return false;   
    }
    return true;
}

// Send sign up request to the server socket io.
function SignUp(_username,_password,_isAdmin){
    socket.emit("sign-up", {
        username: _username,
        password: _password,
        is_admin: _isAdmin
      });
}

// Takse the values from the sign up page and send them to the server -> DB adds the new user.
function SignUpButton(){
    console.log("pressed sign up 3");
    _username = document.getElementById("username").value;
    _password = document.getElementById("firstPassword").value;
    _password2 = document.getElementById("secondPassword").value;
    if(passwordCheck(_password,_password2)==false){
        console.log("username/password are incorrect");
      var SignUpLabel = document.getElementById("value");
      if(SignUpLabel == null){
        console.log("here"); 
      $("#Sign-Up-Respond").append('<p id=value>Passwords are not match.</p>');
      }
      else{
        $("p#value").text("Passwords are not match.");
      }
      return;
    }
    console.log(
      "from index.js - sign up: username is: " +
      _username +
        " password is:" +
        _password
    );
    is_Admin = false;
    SignUp(_username,_password,is_Admin);
    console.log("sent sign-up emit");
}
