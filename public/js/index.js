$(document).ready(() => {
  let route = window.location.href.split("/")[3];
  if (route == "") {
    $("#content").load("views/main.html", () => {});
  }
  if (route == "admin") {
    $("#content").load("views/admin.html");
  }

  if (route == "home") $("#content").load("views/watchList.html");

  if (route == "moviepage") $("#content").load("views/moviePage.html");
  console.log(route);
});
