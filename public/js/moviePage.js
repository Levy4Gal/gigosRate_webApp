// const { json } = require("body-parser");

$(document).ready(function(){
    
    const fixedStars  =[...document.getElementsByClassName("fa fa-star")];
    const ratingStars = [...document.getElementsByClassName("rating__star")];

    fetchMovieByName().then((movie) => {
        loadPageFromDB(movie);
    });

    async function fetchMovieByName(name){
        let url = "http://localhost:8080/movie?movieName=" + "John Wick 2";
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
        document.getElementById("movie").setAttribute("data" ,item.trailer);
         
        showStarsFromDBrate(fixedStars,item);//load static fixed stars
        rateStars(ratingStars,item);//activate rating stars
        let locations = [];
        locations = item.locations;
        initMap(locations);
        // initMap(locations).then((map)=>{
        //     initLocations(locations,map);});
    }

    function showStarsFromDBrate(stars , item){//intalize active stars///
        const starClassActive = "fa fa-star checked";
        const starClassInactive = "fa fa-star-o";
        const halfStarClass = "fa fa-star-half-full";
        const starsLength = stars.length;
        var rateJson =JSON.parse(item.rate);
        var rate =Number.parseFloat(rateJson['totalRate']);
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
        // alert(rate);
        let clientRate;
        stars.map((star) => {
            star.onclick = () => {
                i = stars.indexOf(star);
                clientRate = i+1;        

                if (star.className === starClassInactive) {
                    for (i; i >= 0; --i) stars[i].className = starClassActive;
                } else {
                    for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
                }
                changeRateInDB(clientRate);
                fetchMovieByName().then((movie) => {
                    showStarsFromDBrate(fixedStars,movie)
                });
            };
        });
    }

    async function initMap(locations){
        let center = findeCenter(locations);
        var centerCoord = new google.maps.LatLng(center.lat , center.lng);
        var option = {
            zoom:5,
            center:centerCoord
        }

        let map = await new google.maps.Map(document.getElementById('map') ,option);
        // return map;
    }    
        
    function initLocations(locations,map){
        for (let i = 0; i < locations.length ; i++) {
            var option = {
                position:new google.maps.LatLng(locations[i][0] ,locations[i][1]),
                map:map
            };
            let marker = new google.maps.Marker(option);
            marker.setMap(map);
        }
    }
    function findeCenter(locations){
        let latSum=0 ,lngSum=0;
        let locationsAmount = locations.length;
        for(let i=0 ; i < locationsAmount ;i++){
            latSum += locations[i][0];
            lngSum += locations[i][1];
        }
        let center ={lat:latSum/=locationsAmount , lng:lngSum/=locationsAmount};
        return center;
    }
});

function addToWatch() {
    let movieName = "John Wick 2";
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
    let movieName = "John Wick 2";
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

function scrollToTop() {
    $(window).scrollTop(0);
}

// let newRate; 
// let numOfVoters = item.numOfVoters;
// newRate = ((rate*numOfVoters)+clientRate)/ (numOfVoters+1);
// if(newRate>5){
//newRate = 5;} 

