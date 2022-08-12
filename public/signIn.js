
var url = "https://localhost:8080";

function httpPostRequest(username,email){
let xhr = new XMLHttpRequest();
xhr.open("POST",url + '/login');

xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onload = () => console.log(xhr.responseText);

let myData = new Object();
    myData.username = username; 
    myData.email = email;

// let data = `{
//   "Id": 78912,
//   "Customer": "Jason Sweet",
// }`;

xhr.send(JSON.stringify(myData));
}

function Login(){
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    httpPostRequest(username,email);
}
