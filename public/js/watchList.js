$(document).ready(function () {
  //console.log(ClientUser.userName);

  async function getWatch() {
    let url = "http://localhost:8080/watchList?userName=Guy12";
    const res = await fetch(url);
    console.log(res);
    const movies = await res.json();
    console.log(movies);
    return movies;
  }

  getWatch().then((movies) => {
    // let text = "Hello " + ClientUser.userName + "! here is your watch list";
    // const p = document.getElementById("headLine");
    // p.textContent = text;
    // movieContent.replaceChildren();
    // displayMovies(movies, body);
  });
});
