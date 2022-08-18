+$(document).ready(function () {
  const client = ClientUser.userName;
  const movieContent = document.getElementById("movieContent");
  const body = document.getElementById("body");
  async function getWatch() {
    let url = "http://localhost:8080/watchList?userName=" + client;
    const res = await fetch(url);
    console.log(res);
    const movies = await res.json();
    console.log(movies);
    return movies;
  }

  getWatch().then((movies) => {
    let text = "Hello " + client + "! here is your watch list";
    const p = document.getElementById("headLine");
    p.textContent = text;
    movieContent.replaceChildren();
    displayMovies(movies, body);
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
  let addToCartOpen = "<p><button onclick= 'removeFromWatch(event)' name ='";
  let addToCartClose = "'>Remove from Watch List</button></p>";
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

function removeFromWatch(e) {
  let movieName = e.target.name;
  console.log(movieName);
  //   const Http = new XMLHttpRequest();
  //   const url =
  //     "http://localhost:8080/addToWl?movieName=" + movieName + "&userName=Guy12";
  //   Http.open("POST", url);
  //   Http.send();
}
