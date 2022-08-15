//const { response } = require("express");

$(document).ready(function () {
  displayMovies();
  async function fetchMovies() {
    const res = await fetch("http://localhost:8080/allMovies");
    const movies = await res.json();
    return movies;
  }
  fetchMovies().then((movies) => {
    displayMovies(movies);
  });
});

function displayMovies(movies) {
  console.log(movies);
  let e = document.getElementById("movieContent");
  let imgOpenTemp = "<img class='img' src="; // append img url + imgCloseTemp
  let imgCloseTemp = " onclick = 'start()' >";
  let movieDivOpenTemp = "<html>"; // append movie + movieDivCloseTemp
  let movieDivCloseTemp = "</html>";
  let movieSpanOpenTemp = "<span class ='movieDiv'>"; // append img + text + movieSpanCloseTemp
  let movieSpanCloseTemp = "</span>";
  let textOpenTemp = "<p class = 'text'>"; // append movie name + textCloseTemp
  let textCloseTemp = "</p>";
  let div = null;
  let nameArray = new Array(163);
  let imgArray = new Array(163);
  let tmpArray = [];
  for (let i = 0; i < 163; i++) {
    nameArray[i] = "Casino Royal" + i.toString();
    imgArray[i] =
      "https://drive.google.com/uc?export=view&id=1dVMXPKMWUNdbbyCm4URBpstjvOWrlT7R"; //https://drive.google.com/uc?export=view&id= (add img id)
  }
  for (let i = 0; i < nameArray.length; i++) {
    if (i % 5 == 0) {
      div = document.createElement("div");
      div.setAttribute("class", "movieRow");
    }
    e.appendChild(div);
    let text = textOpenTemp + nameArray[i] + textCloseTemp;
    let img = imgOpenTemp + imgArray[i] + imgCloseTemp;
    let movie = movieSpanOpenTemp + img + text + movieSpanCloseTemp;
    tmpArray.push(movie);
    if (tmpArray.length == 5) {
      let movieDiv = movieDivOpenTemp;
      while (tmpArray.length != 0) {
        movieDiv += tmpArray.pop();
      }
      movieDiv += movieDivCloseTemp;
      div.innerHTML = movieDiv;
    }
  }
  if (tmpArray.length != 0) {
    div = document.createElement("div");
    e.appendChild(div);
    let movieDiv = movieDivOpenTemp;
    while (tmpArray.length != 0) {
      movieDiv += tmpArray.pop();
    }
    movieDiv += movieDivCloseTemp;
    div.innerHTML = movieDiv;
  }
}

function start() {
  alert("inside start");
}
