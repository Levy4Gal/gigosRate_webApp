$(document).ready(function () {
  const movieContent = document.getElementById("movieContent");
  const body = document.getElementById("body");
  async function fetchAllMovies() {
    let res = await fetch("http://localhost:8080/allMovies");
    const movies = await res.json();
    return movies;
  }
  fetchAllMovies().then((movies) => {
    displayMovies(movies, movieContent);
  });
  $(".searchButton").click(function () {
    var inputString = $(".movie-search").val();
    $(".movie-search").val("");

    alert(inputString);
  });
});

function displayMovies(movies, e) {
  e.replaceChildren();
  let imgOpenTemp = "<img class='img' name= '";
  let imgSrc = "' src='"; // append img url + imgCloseTemp
  let imgCloseTemp = " 'onclick = 'moveToMovie(event)' >";
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
    if (i % 4 == 0) {
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
    if (tmpArray.length == 4) {
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

function moveToMovie(e) {
  let movieName = e.target.name;
  window.localStorage.setItem("movieName", movieName);
  console.log(movieName);
  let doc = document.getElementById("content");
  doc.replaceChildren();
  let div = document.createElement("div");
  div.setAttribute("id", "movieCard");
  doc.appendChild(div);
  $("#movieCard").load("views/moviePage.html", () => {});
}

function addToWatch(e) {
  let movieName = e.target.name;
  const Http = new XMLHttpRequest();
  const url =
    "http://localhost:8080/addToWl?movieName=" +
    movieName +
    "&userName=" +
    ClientUser.userName;
  Http.open("POST", url);
  Http.send();

  async function getWatch(userName) {
    let url = "http://localhost:8080/watchList?userName=" + userName;
    const res = await fetch(url);
    const movies = await res.json();
    console.log(movies);
    return movies;
  }

  getWatch(ClientUser.userName).then((movies) => {
    let text = "Hello " + ClientUser.userName + "! here is your watch list";
    const p = document.getElementById("headLine");
    p.textContent = text;
    movieContent.replaceChildren();
    displayMovies(movies, body);
  });
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
      displayMovies(movies, movieContent);
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
      displayMovies(movies, movieContent);
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
      displayMovies(movies, movieContent);
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
        displayMovies(movies, movieContent);
      });
    } else {
      fetchByYear(x, x).then((movies) => {
        let e = document.getElementById("movieContent");
        displayMovies(movies, movieContent);
      });
    }
  }
}
