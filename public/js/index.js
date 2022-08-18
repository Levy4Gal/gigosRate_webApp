$(document).ready(() => {
  let route = window.location.href.split("/")[3];
  if (route == "") {
    $("#content").load("views/main.html", () => {});
  }
  if (route == "admin") {
    $("#content").load("views/admin.html");
  }

  if (route == "watchlist-view") $("#content").load("views/watchList.html");

  if (route.includes("moviepage")) $("#content").load("views/moviePage.html");
  console.log(route);

  if (route == "login") {
    $("#content").load("views/signIn.html");
  }

  if (route == "sign-up") {
    $("#content").load("views/signUp.html");
  }

  if (route == "about") {
    $("#content").load("views/about.html");
  }
});
 
//