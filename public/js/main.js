//const { response } = require("express");

$(document).ready(function () {
  //displayMovies();
  async function fetchMovies() {
    const res = await fetch("https://www.anapioficeandfire.com/api/books");
    const movies = await res.json();
    return movies;
  }

  fetchMovies().then((movies) => {
    displayMovies(movies);
  });
});

function displayMovies(movies) {
  console.log(movies);
  let e = document.getElementById("content");
  let imgOpenTemp = "<img class='img' src="; // append img url + imgCloseTemp
  let imgCloseTemp = " onclick = 'start()' >";
  let movieDivOpenTemp = "<html><div class ='movieRow'>"; // append movie + movieDivCloseTemp
  let movieDivCloseTemp = "</div></html>";
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
      "https://drive.google.com/file/d/1dVMXPKMWUNdbbyCm4URBpstjvOWrlT7R/view?usp=sharing";
    // "https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg";
  }
  for (let i = 0; i < nameArray.length; i++) {
    if (i % 5 == 0) {
      div = document.createElement("div");
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
