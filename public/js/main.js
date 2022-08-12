$(document).ready(function () {
  var e = document.getElementById("content");
  var e1 = document.createElement("div");
  var e2 = document.createElement("div");
  e.appendChild(e1);
  e.appendChild(e2);
  let img = "<img class='img' src='img/casino-royale.jpg' />";
  let img1 = "<img class='img' src='img/action.jpg' />";
  let text = "<p class = 'text' >Casino Royal</p>";

  let movie = "<span class ='movieDiv'>" + img + text + "</span>";
  let movie1 = "<span class ='movieDiv'>" + img1 + text + "</span>";

  e1.innerHTML =
    "<html><div class ='movieRow'>" +
    movie +
    movie +
    movie +
    movie +
    "</div></html>";

  e2.innerHTML =
    "<html><div class ='movieRow'>" +
    movie1 +
    movie1 +
    movie1 +
    movie1 +
    "</div></html>";

  //var el2 = document.getElementById("content2");
  // el.innerHTML = "<html><div class ='movieDiv'>" + img + "</div></html>";
});
