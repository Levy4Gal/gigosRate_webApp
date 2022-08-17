
//initial load
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
function showAddedUsersLastWeek(){
    var ctx = document.getElementById("myChart").getContext('2d');

}
$( document ).ready(function() {
    var ctx = document.getElementById("myChart").getContext('2d');
    //user creation stats
        var xValues = ["January", "February", "March", "April", "May","June","July","August", "September","October","November","December"];
        var yValues = [55, 49, 44, 24, 15];
        var barColors = ["red", "green","blue","orange","brown"];
        let c = new Chart(ctx, {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: barColors,
            data: yValues
            }]
        },
        options: {
            legend: {display: false},
            title: {
            display: true,
            text: "Weekly User Creation"
            }
        }
        }); 
    });


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
                console.log(displayedMovies[i].movieName);
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
        httpGetAsync(`http://localhost:8080/movie?movieName=${txt}`,handleSearchedMovie);
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
    httpPostAsync(`http://localhost:8080/addMovie?userName=inon&movieName=${movieName}&description=${movieDesc}&locations=${locations}&trailer=${trailer}&rate=0&duration=${duration}&director=${director}&stars=${stars}&img=${img}`,"",(value) => console.log(value))
    //var json = `{   "movieName":"${movieName}",   "movieDescription":"${movieDesc}",   "locations":"${locations}",   "trailer":"${trailer}",   "duration":"${duration}",   "director":"${director}",   "stars":"${stars}",   "img":"${img}" }`;
    // console.log(JSON.parse(json));
}