
var movieName;

$(document).ready(function(){
    
    const fixedStars  =[...document.getElementsByClassName("fa fa-star")];
    const ratingStars = [...document.getElementsByClassName("rating__star")];

    movieName = getMovieName();
    fetchMovieByName(movieName).then((movie) => {
        loadPageFromDB(movie);
        addLocations(movie);
    });
    
    function getMovieName(){
        let thisPageUrl = window.location.href;
        let urlSplit = [];
        urlSplit = thisPageUrl.split("moviename=");
        let query = urlSplit[1];
        let querySplit = [];
        querySplit = query.split("%20");
        movieName = querySplit.join(" ");
        return movieName;
    }
    
    async function fetchMovieByName(movieName){
        let url = "http://localhost:8080/movie?searchMovie=" + movieName;
        let movieJason = await fetch(url);
        const movie = await movieJason.json();
        return movie;
    }
    
    function loadPageFromDB(item){
      
        document.getElementById("movieName").innerHTML = item.movieName;
        document.getElementById("description").innerHTML ="Description: " + item.description;
        document.getElementById("duration").innerHTML = "Duration: " + item.duration;
        document.getElementById("director").innerHTML ="Director: " + item.director;
        document.getElementById("writer").innerHTML ="Writer: " + item.writer;
        document.getElementById("stars").innerHTML ="Stars: " + item.stars;
        document.getElementById("image").setAttribute("src" ,item.img);
        let url =fixUrl(item.trailer);
        document.getElementById("movie").setAttribute("data" ,url);
         
        showStarsFromDBrate(fixedStars,item);
        rateStars(ratingStars,item);
    }

    function fixUrl(url){
        let splitUrl = [];
        splitUrl = url.split("watch?v=");
        finalUrl = splitUrl.join("embed/");
        finalUrl = finalUrl.concat('' ,'?autoplay=1');
        return finalUrl;
    }
    function showStarsFromDBrate(stars , item){
        const starClassActive = "fa fa-star checked";
        const starClassInactive = "fa fa-star-o";
        const halfStarClass = "fa fa-star-half-full";
        const starsLength = stars.length;
        var rateJson =JSON.parse(item.rate);
        var rate =Number.parseFloat(rateJson['totalRate']);
        rate = rate.toFixed(1);
        let boolienFlag = false;
        document.getElementById("rate").innerHTML = rate;
        var roundRate =  Math.floor(rate);
        for (let idx = 0; idx < starsLength; idx++) {
            if(idx < roundRate){
                stars[idx].className = starClassActive;
            }else{
                if((rate-roundRate)>= 0.5 && boolienFlag==false ){
                    stars[idx].className = halfStarClass;
                    boolienFlag = true;
                }else{
                    stars[idx].className = starClassInactive;
                }
            }
        } 
    }
    
    function rateStars(stars,item) {
        const starClassActive = "rating__star fas fa-star";
        const starClassInactive = "rating__star far fa-star";
        const starsLength = stars.length;   
        let i;
        let rate = parseFloat(item.rate);
        let clientRate;
        stars.map((star) => {
            star.onclick = () => {
                i = stars.indexOf(star);
                        
                if (star.className === starClassInactive) {
                    clientRate = i+1;
                    for (i; i >= 0; --i) stars[i].className = starClassActive;
                } else {
                    clientRate = i;
                    for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
                }
                changeRateInDB(clientRate);
                fetchMovieByName(movieName).then((movie) => {
                    showStarsFromDBrate(fixedStars,movie)
                });
                console.log(movie);
            };
        });
    }
});

function addToWatch() {
    const Http = new XMLHttpRequest();
    const url =
      "http://localhost:8080/addToWl?movieName=" +
      movieName +
      "&userName=" +
      ClientUser.userName;
    Http.open("POST", url);
    Http.send();
    alert("movie added to watch list");
}

function changeRateInDB(rate) {
    const Http = new XMLHttpRequest();
    const url =
      "http://localhost:8080/rate?movieName=" +
      movieName +
      "&userName=" +
      ClientUser.userName + 
      "&rate="+
      rate;
    Http.open("POST", url);
    Http.send();
    alert("rate have changed");
}

async function getCoordsFromCountryName(country){
    let url =
    "http://localhost:8080/country?country=" + country;
    let coordsJason = await fetch(url);
    const coords = await coordsJason.json();
    return coords;
}

var map;
function initMap() {
    let worldCenter = {lat: 40.52, lng: 34.34};
    var options = {
        zoom: 2,
        center: worldCenter
    }
    map = new google.maps.Map(document.getElementById('map'), options); 
}

function addLocations(item){
    locations = [];
    locations = item.locations.split(",");
    for (let i = 0; i < locations.length; i++) {
        getCoordsFromCountryName(locations[i]).then((coords)=>{
            var location = new google.maps.Marker({
                position:coords,
                map:map
            });
        }); 
    } 
}

function scrollToTop() {
    $(window).scrollTop(0);
}

// async function findeCenter(locations){
//     let latSum=0 ,lngSum=0;
//     let locationsAmount = locations.length;
//     for(let i=0 ; i < locationsAmount ;i++){
//         getCoordsFromCountryName(locations[i]).then((coords)=>{
//             latSum += coords.lat;
//             lngSum += coords.lng;
//         });
       
//     }
//     let center ={lat:(latSum/=locationsAmount) , lng:(lngSum/=locationsAmount)};
//     console.log(center);
//     return center;
// }           