$(document).ready(function(){
    
    const item = {"id":1,
        "name": "John Wick 2",
        "duration":"122 minutes" ,
        "description":"After returning to the criminal underworld to repay a debt John Wick discovers that a large bounty has been put on his life.",
        "director":"Chad Stahelski",
        "writer":"Derek Kolstad" ,
        "stars":"keanu reevas , Chad Stahelski" ,
        "grade":3.5 ,
        "numOfVoters" :2
    };
    const fixedStars  =[...document.getElementsByClassName("fa fa-star")];
    const ratingStars = [...document.getElementsByClassName("rating__star")];


    function loadPageFromDB(){
        //intilze all data//
        //all data should intilize from DB//
        document.getElementById("movieName").innerHTML = item.name;
        document.getElementById("description").innerHTML ="Description: " + item.description;
        document.getElementById("duration").innerHTML = "Duration: " + item.duration;
        document.getElementById("director").innerHTML ="Director: " + item.director;
        document.getElementById("writer").innerHTML ="Writer: " + item.writer;
        document.getElementById("stars").innerHTML ="Stars: " + item.stars;

        toFixedRate(fixedStars);
        executeRating(ratingStars);
    }
    loadPageFromDB();
   
    function toFixedRate(stars){//intalize active stars///
        const starClassActive = "fa fa-star checked";
        const starClassInactive = "fa fa-star-o";
        const halfStarClass = "fa fa-star-half-full";
        const starsLength = stars.length;
        var grade = item.grade;
        let boolienFlag = false;
        document.getElementById("grade").innerHTML = grade.toFixed(1);
        var roundGrade =  Math.floor(grade);
        for (let idx = 0; idx < starsLength; idx++) {
            if(idx < roundGrade){
                stars[idx].className = starClassActive;
            }else{
                if((grade-roundGrade)>= 0.5 && boolienFlag==false ){
                    stars[idx].className = halfStarClass;
                    boolienFlag = true;
                }else{
                    stars[idx].className = starClassInactive;
                }
            }
        } 
    }
    
    function executeRating(stars) {
        const starClassActive = "rating__star fas fa-star";
        const starClassInactive = "rating__star far fa-star";
        const starsLength = stars.length;
        let newGrade;    
        let i;

        let numOfVoters = item.numOfVoters;///should get from DB
        let grade = item.grade;
        let roundGrade = Math.round(grade);
        let clientRate;
        stars.map((star) => {
            star.onclick = () => {
                i = stars.indexOf(star);
                clientRate = i+1;        
                newGrade = ((grade*numOfVoters)+clientRate)/ (numOfVoters+1);
                if(newGrade>5){
                    newGrade = 5;
                }  
                item.grade = newGrade;    
                    
                toFixedRate(fixedStars);
            
                item.numOfVoters = numOfVoters+1;      

                if (star.className === starClassInactive) {
                    for (i; i >= 0; --i) stars[i].className = starClassActive;
                } else {
                    for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
                }
            };
        });
    }
});

function addToList(){
    alert("movie added to watch list");
}

function scrollToTop() {
    $(window).scrollTop(0);
}
