$(document).ready(() => {
  let route = window.location.href.split("/")[3];
  if(route == ""){
    $("#content").load("views/main.html", () => {
    });  
  }
  if(route == "admin"){
    $("#content").load("views/admin.html");
  }
  console.log(route);
});
