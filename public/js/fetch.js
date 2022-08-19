async function fetchMovies(movieName) {
  let url;
  if (movieName != null) {
    console.log(movieName[1]);
    url = "http://localhost:8080/searchMovie?";
    if (movieName[0] != null) url += "movieName=" + movieName[0];
    if (movieName[1] != null) url += "&genre=" + movieName[1];
    if (movieName[2] != null) url += "&startYear=" + movieName[2];
    if (movieName[3] != null) url += "&endYear=" + movieName[3];
  } else {
    url = "http://localhost:8080/allMovies";
  }
  console.log(url);

  let res = await fetch(url);
  const movies = await res.json();
  console.log(movies);
  return movies;
}

function displayMovies(movies, e) {
  e.replaceChildren();
  let imgOpenTemp = "<img class='img' name= '";
  let imgSrc = "' src='"; // append img url + imgCloseTemp
  let star = "<span class=" + "'fa fa-star checked'" + "></span>";
  let rateOpen = "<span class=rate>";
  let rateClose = "</span>";
  let imgCloseTemp = " 'onclick = 'moveToMoviePage(event)' >";
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
    let totalRate = Number(JSON.parse(movies[i].rate).totalRate);
    totalRate = totalRate.toFixed(1);
    let name = movies[i].movieName;
    let rate = rateOpen + totalRate + rateClose;
    let text = textOpenTemp + name + textCloseTemp;
    let img = imgOpenTemp + name + imgSrc + movies[i].img + imgCloseTemp;
    let movie =
      movieSpanOpenTemp +
      img +
      text +
      addToCartOpen +
      name +
      addToCartClose +
      star +
      rate +
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
