
//initial load
addJS_Node (null, "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js", null, showAddedUsersLastWeekStatistics);

var displayedMovies;
var displayUsers; // needs to add
var lastWeekUsers;
var moviesByGenere;
let onUsers = false;

$( document ).ready(function() {
    httpGetAsync("http://localhost:8080/firstMovies?num=8",handleMovies);
    // httpGetAsync()
});


//statistics  
function showAddedUsersLastWeekStatistics(){
    $( document ).ready(function() {
        //user creation stats
            var ctx = document.getElementById("myChart").getContext('2d');
            var xValues = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday","Saturday"];
            var yValues = [55, 49, 44, 24, 15,3,40];
            var barColors = ["#47B5FF", "#47B5FF","#47B5FF","#47B5FF","#47B5FF","#47B5FF","#47B5FF"];
            let c = new Chart(ctx, {
            type: "bar",
            data: {
                labels: xValues,
                datasets: [{
                backgroundColor: barColors,
                data: yValues,
                fontColor: "white"
                }]
            },
            options: {
                legend: {display: false},
                
                title: {
                display: true,
                text: "Weekly User Creation",
                fontColor: "white"
                }
            }
            }); 
        });
    
}


function handleMovies(movies){
    displayedMovies= JSON.parse(movies);
    displayLoadedMovies();
}

function handleSearchedMovie(movie){
    if(movie != "this movie is not exist"){
        displayedMovies = [];
        displayedMovies.push(JSON.parse(movie));
        displayLoadedMovies();    
    }
    else{
        displayedMovies = [];
        displayLoadedMovies();    
    }
}
function displayLoadedMovies(){
    $( document ).ready(function() {
        if(!onUsers){
            $(".list").empty();
            for(let i=0; i<displayedMovies.length;i++){
                let line =         `          <div class="line">
                <div class="name"> ${displayedMovies[i].movieName}</div>
                <img class="edit" src="img/editIcon.png"/>
                <img class="delete" src="img/deleteIcon.png" />
              </div>`;
                $(".list").append(line);
            }        
        }
    });
}
function displayLoadedUsers(){
    $( document ).ready(function() {
        if(onUsers){
            $(".list").empty();
            for(let i=0; i<displayUsers.length;i++){
                let line =         `          <div class="line">
                <div class="name"> ${displayUsers[i].userName}</div>
                <img class="edit" src="img/editIcon.png"/>
                <img class="delete" src="img/deleteIcon.png" />
              </div>`;
                $(".list").append(line);
            }        
        }
    });
}


function changeOnUsers(state){
    onUsers = state;
    // console.log(onUsers);
    if(onUsers){
        displayLoadedUsers();
    }
    else displayLoadedMovies();

    $("#moviesOption").toggleClass("selectetOption");
    $("#moviesOption").toggleClass("innerOption");
    $("#usersOption").toggleClass("selectetOption");
    $("#usersOption").toggleClass("innerOption");

}

$( document ).ready(function() {
    var input = document.getElementById("searchInput");

    input.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            search();
        }
      });
    
});


  function search(){
    var txt =  $('#searchInput').val();
    if(!onUsers){
        if(txt != "")
            httpGetAsync(`http://localhost:8080/movie?movieName=${txt}`,handleSearchedMovie);
        else 
            httpGetAsync("http://localhost:8080/firstMovies?num=8",handleMovies);
    }
    // console.log(txt);
}

function onAddMovie(){
    var movieName =  $('#movieName').val();
    var movieDesc = $('#movieDescription').val();
    var locations= $('#locations').val();
    var trailer= $('#trailerLink').val();
    var duration= $('#duration').val();
    var director= $('#director').val();
    var stars= $('#stars').val();
    var img= $('#imgLink').val();
    var releaseYear = $('#releaseYear').val();
    var genre = $('#genre').val();
    httpPostAsync(`http://localhost:8080/addMovie?userName=inon&movieName=${movieName}&description=${movieDesc}&locations=${locations}&trailer=${trailer}&rate=0&duration=${duration}&director=${director}&stars=${stars}&img=${img}&releaseYear=${releaseYear}&genre=${genre}`,"",(value) => console.log(value))
    //var json = `{   "movieName":"${movieName}",   "movieDescription":"${movieDesc}",   "locations":"${locations}",   "trailer":"${trailer}",   "duration":"${duration}",   "director":"${director}",   "stars":"${stars}",   "img":"${img}" }`;
    // console.log(JSON.parse(json));
}


function addJS_Node (text, s_URL, funcToRun, runOnLoad) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    if (runOnLoad) {
        scriptNode.addEventListener ("load", runOnLoad, false);
    }
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}