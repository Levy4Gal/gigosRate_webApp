function passwordCheck(pas1,pas2){
    if(pas1!=pas2){
        return false;   
    }
    return true;
}

function SignUp(_username,_password,_isAdmin){
    socket.emit("sign-up", {
        username: _username,
        password: _password,
        is_admin: _isAdmin
      });
}


function mySignUp3(){
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
    // console.log(username);
    // console.log(password);
    is_Admin = false;
    SignUp(_username,_password,is_Admin);
    console.log("sent sign-up emit");
}
