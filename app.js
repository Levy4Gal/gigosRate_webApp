const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

app.use(express.json());
app.use(express.static("public"));

app.set('views','./public/views');
// app.use(express.static("public/views"))
// app.set('views','./public/views');
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/views/index.html"));
});

app.listen(port, () => console.info("Listening on port " ,port));

app.get("/sign_up", (req, res) => {
  // res.sendFile(path.join(__dirname, "public/views/index.html"));
  // res.sendFile(path.join(__dirname, "public/views/signup2.html"));
  // getSignUpPage();
});


function getSignUpPage(){
  console.log("inside signup load");
  document.getElementsByClassName("contect").load(__dirname +"public/views/SignUp.html");
  // $(".content").load(__dirname +"public/views/SignUp.html");  
}




