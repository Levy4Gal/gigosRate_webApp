$(document).ready(function(){
    
    const fixedStars  =[...document.getElementsByClassName("fa fa-star")];
    const ratingStars = [...document.getElementsByClassName("rating__star")];

    fetchMovieByName().then((movie) => {
        loadPageFromDB(movie);
    });

    async function fetchMovieByName(name){
        let movieJason;
        let url = "http://localhost:8080/movie?movieName=" + "John Wick 2";
        movieJason = await fetch(url);
        const movie = await movieJason.json();
        return movie;
    }
    
    function loadPageFromDB(item){
        //intilze all data//
        //all data should intilize from DB//
        document.getElementById("movieName").innerHTML = item.movieName;
        document.getElementById("description").innerHTML ="Description: " + item.description;
        document.getElementById("duration").innerHTML = "Duration: " + item.duration;
        document.getElementById("director").innerHTML ="Director: " + item.director;
        document.getElementById("writer").innerHTML ="Writer: " + item.writer;
        document.getElementById("stars").innerHTML ="Stars: " + item.stars;
        document.getElementById("image").setAttribute("src" ,item.img);
        document.getElementById("movie").setAttribute("data" ,item.trailer);
         
        toFixedRate(fixedStars,item);//load static fixed stars
        executeRating(ratingStars,item);//activate rating stars
        let locations = [];
        locations = item.locations;
        initMap(locations).then((map)=>{
            initLocations(locations,map);
        });//initialization map with markers
    }
   
    function toFixedRate(stars , item){//intalize active stars///
        const starClassActive = "fa fa-star checked";
        const starClassInactive = "fa fa-star-o";
        const halfStarClass = "fa fa-star-half-full";
        const starsLength = stars.length;
        var rate = item.rate;
        let boolienFlag = false;
        document.getElementById("rate").innerHTML = rate.toFixed(1);

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
    
    function executeRating(stars,item) {
        const starClassActive = "rating__star fas fa-star";
        const starClassInactive = "rating__star far fa-star";
        const starsLength = stars.length;
        let newRate;    
        let i;
        let numOfVoters = item.numOfVoters;///should get from DB
        let rate = item.rate;
        let clientRate;
        stars.map((star) => {
            star.onclick = () => {
                i = stars.indexOf(star);
                clientRate = i+1;        
                newRate = ((rate*numOfVoters)+clientRate)/ (numOfVoters+1);
                if(newRate>5){
                    newRate = 5;
                } 

                if (star.className === starClassInactive) {
                    for (i; i >= 0; --i) stars[i].className = starClassActive;
                } else {
                    for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
                }
                /////////////////////////////////////////
                item.rate = newRate;  //need to push to DB//  
                item.numOfVoters = numOfVoters+1;
                //////////////////////////////////////////
            
                toFixedRate(fixedStars,item);
            
                
            };
        });
    }

    async function initMap(locations){
        let center = findeCenter(locations);
        var option = {
            zoom:5,
            center:center
        }
        var map = await new google.maps.Map(document.getElementById('map') ,option);
        return map;
    }    
        
    async function initLocations(locations,map){
        for (let i = 0; i < locations.length ; i++) {
            var marker = new google.maps.Marker({
                position:{lat:locations[i][0] , lng:locations[i][1] },
                map:map
            });
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

function addToList(){
    const movieName = document.getElementById('movieName');
    alert(movieName);
    addToWatch(movieName);
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
    alert("movie added to watch list");
}

function scrollToTop() {
    $(window).scrollTop(0);
}


////item example//
// const item = {id:1,
    //     name: "John Wick 2",
    //     duration:"122 minutes" ,
    //     description:"After returning to the criminal underworld to repay a debt John Wick discovers that a large bounty has been put on his life.",
    //     director:"Chad Stahelski",
    //     writer:"Derek Kolstad" ,
    //     stars:"keanu reevas , Chad Stahelski" ,
    //     grade:3.5 ,
    //     numOfVoters :2 ,
    //     markers : [{lat:42.4668 ,lng:-70.9495},{lat:40.4668,lng:-71.9495}] 
    // };