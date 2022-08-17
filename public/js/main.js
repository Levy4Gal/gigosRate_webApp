//const { response } = require("express");

$(document).ready(function () {
  // const data = {
  //   movieName: "Toy story 3",
  //   description: "blbla",
  //   locations: '["1","2"]',
  //   trailer: "http...",
  //   rate: '{"user1":3,"user2":4,"totalRate":3,"gal":"2"}',
  //   duration: "120",
  //   director: "Yanon",
  //   stars: "Gal Levy",
  //   img: "https://drive.google.com/uc?export=view&id=1dVMXPKMWUNdbbyCm4URBpstjvOWrlT7R",
  //   genre: "comedy",
  //   releaseYear: "2006",
  // };

  // let xhr = new XMLHttpRequest();
  // xhr.open("POST", "http://localhost:8080/addMovie");

  // xhr.onload = () => console.log(xhr.responseText);

  // xhr.send(data);

  // fetch("http://localhost:8080/addMovie", {
  //   method: "POST",
  //   body: JSON.stringify(data),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("Success:", data);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });

  async function fetchAllMovies() {
    let res = await fetch("http://localhost:8080/allMovies");
    const movies = await res.json();
    return movies;
  }

  fetchAllMovies().then((movies) => {
    displayMovies(movies);
  });
});

function displayMovies(movies) {
  let e = document.getElementById("movieContent");
  e.replaceChildren();
  let imgOpenTemp = "<img class='img' name= '";
  let imgSrc = "' src='"; // append img url + imgCloseTemp
  let imgCloseTemp = " 'onclick = 'start(event)' >";
  let movieDivOpenTemp = "<html>"; // append movie + movieDivCloseTemp
  let movieDivCloseTemp = "</html>";
  let movieSpanOpenTemp = "<div class ='movieDiv'>"; // append img + text + movieSpanCloseTemp
  let movieSpanCloseTemp = "</div>";
  let textOpenTemp = "<p class = 'text'>"; // append movie name + textCloseTemp
  let textCloseTemp = "</p>";
  let addToCartOpen = "<p><button onclick= 'addToWatch(event)' name ='";
  let addToCartClose = "'>Add to Watch List</button></p>";
  let div = null;
  let tmpArray = [];
  for (let i = 0; i < movies.length; i++) {
    if (i % 5 == 0) {
      div = document.createElement("div");
      div.setAttribute("class", "movieRow");
    }
    let name = movies[i].movieName;

    let text = textOpenTemp + name + textCloseTemp;
    let img = imgOpenTemp + name + imgSrc + movies[i].img + imgCloseTemp;
    let movie =
      movieSpanOpenTemp +
      img +
      text +
      addToCartOpen +
      name +
      addToCartClose +
      movieSpanCloseTemp;
    tmpArray.push(movie);
    if (tmpArray.length == 5) {
      e.appendChild(div);
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
    div.setAttribute("class", "movieRow");
    e.appendChild(div);
    let movieDiv = movieDivOpenTemp;
    while (tmpArray.length != 0) {
      movieDiv += tmpArray.pop();
    }
    movieDiv += movieDivCloseTemp;
    div.innerHTML = movieDiv;
  }
}

function start(e) {
  let movieName = e.target.name;
  console.log(movieName);
}

function addToWatch(e) {
  let movieName = e.target.name;
  console.log(movieName);
}
function displayGenre() {
  let x = document.getElementById("genre").value;
  if (x === "all genres") {
    async function fetchAllMovies() {
      let res = await fetch("http://localhost:8080/allMovies");
      const movies = await res.json();
      return movies;
    }

    fetchAllMovies().then((movies) => {
      displayMovies(movies);
    });
  } else {
    async function fetchByGenre(genre) {
      let urlAndGenre = "http://localhost:8080/moviesByGenre?genre=" + genre;
      const res = await fetch(urlAndGenre);
      const movies = await res.json();
      console.log(movies);
      return movies;
    }
    fetchByGenre(x).then((movies) => {
      displayMovies(movies);
    });
  }
}

function displayByYear() {
  let x = document.getElementById("year").value;
  if (x === "all years") {
    async function fetchAllMovies() {
      let res = await fetch("http://localhost:8080/allMovies");
      const movies = await res.json();
      return movies;
    }

    fetchAllMovies().then((movies) => {
      displayMovies(movies);
    });
  } else {
    async function fetchByYear(startYear, endYear) {
      let urlAndYears =
        "http://localhost:8080/moviesByRY?start=" +
        startYear +
        "&end=" +
        endYear;
      let res = await fetch(urlAndYears);
      const movies = await res.json();
      return movies;
    }
    if (x.includes("-")) {
      let yearArr = x.split("-");
      fetchByYear(yearArr[0], yearArr[1]).then((movies) => {
        displayMovies(movies);
      });
    } else {
      fetchByYear(x, x).then((movies) => {
        displayMovies(movies);
      });
    }
  }
}
