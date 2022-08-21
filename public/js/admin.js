
//initial load

var displayedMovies;
var displayUsers; // needs to add
var lastWeekUsers;
var moviesByGenere;
var userStatisticsData;
var userStatLargest;
var movieGenreData;
let onUsers = false;
let userChart = true;

$( document ).ready(function() {
    httpGetAsync("http://localhost:8080/firstMovies?num=10",handleMovies);
    httpGetAsync("http://localhost:8080/userStatics",handleUserStatics);
    httpGetAsync("http://localhost:8080/movStatics",handleMovieStatics);
});


function handleMovies(movies){
    displayedMovies= JSON.parse(movies);
    displayLoadedMovies();
}
function handleSearchedUser(user){
    displayUsers = JSON.parse(user);
    displayLoadedUser();
}
function handleSearchedMovie(movie){
    if(movie != "this movie is not exist"){
        displayedMovies = [];
        displayedMovies = JSON.parse(movie);
        displayLoadedMovies();    
    }
    else{
        displayedMovies = [];
        displayLoadedMovies();    
    }
}

function displayLoadedUser(){
    if(onUsers && displayUsers!=null){
        $(".list").empty();
        let line =         `          <div class="line">
        <div class="name"> ${displayUsers.userName}</div>
        <img class="delete" src="img/deleteIcon.png" />
      </div>`;
        $(".list").append(line);

    }
}

function displayLoadedMovies(){
    $( document ).ready(function() {
        if(!onUsers){
            $(".list").empty();
            for(let i=0; i<displayedMovies.length && i<10;i++){
                let line =         `          <div class="line">
                <div class="name"> ${displayedMovies[i].movieName}</div>
                <img class="edit" src="img/editIcon.png"/>
                <img id="${displayedMovies[i].movieName}" onclick="deleteMovie(this.id)" class="delete" src="img/deleteIcon.png" />
              </div>`;
                $(".list").append(line);
            }        
        }
    });
}

function deleteMovie(name){
    httpPostAsync(`http://localhost:8080/removeMovie?userName=Inon&movieName=${name}`,"",search);
}

function changeOnUsers(state){
    onUsers = state;
    // console.log(onUsers);
    if(onUsers){
        $('.list').empty();
        $("#moviesOption").removeClass();
        $("#usersOption").removeClass();
        $("#moviesOption").addClass("innerOption");
        $("#usersOption").addClass("selectetOption");

    }
    else {
        displayLoadedMovies();
        $("#moviesOption").removeClass();
        $("#usersOption").removeClass();
        $("#usersOption").addClass("innerOption");
        $("#moviesOption").addClass("selectetOption");

    }
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
            httpGetAsync(`http://localhost:8080/searchMovie?movieName=${txt}`,handleSearchedMovie);
        else 
            httpGetAsync("http://localhost:8080/firstMovies?num=10",handleMovies);
    }
    else{
        httpGetAsync(`http://localhost:8080/user?userName=${txt}`,handleSearchedUser);
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
    httpPostAsync(`http://localhost:8080/addMovie?userName=Inon&movieName=${movieName}&description=${movieDesc}&locations=${locations}&trailer=${trailer}&rate=0&duration=${duration}&director=${director}&stars=${stars}&img=${img}&releaseYear=${releaseYear}&genre=${genre}`,"",
    function (value){
        alert(value);
        $('#movieName').val() = "";
        $('#movieDescription').val() = "";
        $('#locations').val()= "";
        $('#trailerLink').val() = "";
        $('#duration').val() = "";
        $('#director').val() = "";
        $('#stars').val() = "";
        $('#imgLink').val() = "";
        $('#releaseYear').val() = "";
        $('#genre').val() = "";
    });
    //var json = `{   "movieName":"${movieName}",   "movieDescription":"${movieDesc}",   "locations":"${locations}",   "trailer":"${trailer}",   "duration":"${duration}",   "director":"${director}",   "stars":"${stars}",   "img":"${img}" }`;
    // console.log(JSON.parse(json));
}

function changeChart(uChart){
    userChart = uChart;
    if(userChart){
        createUserBarChart(userStatisticsData,userStatLargest + 5);
        $("#userChartOption").removeClass();
        $("#genreChartOption").removeClass();
        $("#userChartOption").addClass("selectedChartOption");
        $("#genreChartOption").addClass("chartOption");

    }
    else
    {
        createPieChart(movieGenreData);
        $("#userChartOption").removeClass();
        $("#genreChartOption").removeClass();
        $("#userChartOption").addClass("chartOption");
        $("#genreChartOption").addClass("selectedChartOption");
    }    
}

function handleUserStatics(res){
    // res = res.sort(custom_sort);
    userStatisticsData = JSON.parse(res);
    userStatLargest = 0;
    for(let i=0; i<userStatisticsData.length;i++){
        if(userStatisticsData[i].count > userStatLargest)
            largest = userStatisticsData[i].count;
    }
    userStatisticsData = userStatisticsData.sort((a, b) => {
        var parts = a._id.split("/");
        var dtA = new Date(parseInt(parts[2], 10),
                  parseInt(parts[1], 10) - 1,
                  parseInt(parts[0], 10));

        var parts = b._id.split("/");

        var dtB = new Date(parseInt(parts[2], 10),
            parseInt(parts[1], 10) - 1,
            parseInt(parts[0], 10));

        return dtA - dtB;
      });
    createUserBarChart(userStatisticsData,userStatLargest+5);
}

function handleMovieStatics(res){
    movieGenreData = JSON.parse(res);
}