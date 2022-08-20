$(document).ready(function () {
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
    let doc = document.getElementsByClassName("#watch-list");
  });
});

function removeFromWatch(e) {
  let movieName = e.target.name;
  const Http = new XMLHttpRequest();
  const url =
    "http://localhost:8080/removeFromWl?movieName=" +
    movieName +
    "&userName=" +
    ClientUser.userName;
  Http.open("POST", url);
  Http.send();
  location.reload();
}
