
//initial load

var displayedMovies;
var displayUsers; // needs to add
var lastWeekUsers;
var moviesByGenere;
var userStatisticsData;
var userStatLargest;
let onUsers = false;
let userChart = true;

$( document ).ready(function() {
    httpGetAsync("http://localhost:8080/firstMovies?num=8",handleMovies);
    httpGetAsync("http://localhost:8080/userStatics",handleUserStatics);
});


//statistics  
// function showAddedUsersLastWeekStatistics(){
//     $( document ).ready(function() {
//         //user creation stats
//             var ctx = document.getElementById("myChart").getContext('2d');
//             var xValues = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday","Saturday"];
//             var yValues = [55, 49, 44, 24, 15,3,40];
//             var barColors = ["#47B5FF", "#47B5FF","#47B5FF","#47B5FF","#47B5FF","#47B5FF","#47B5FF"];
//             let c = new Chart(ctx, {
//             type: "bar",
//             data: {
//                 labels: xValues,
//                 datasets: [{
//                 backgroundColor: barColors,
//                 data: yValues,
//                 fontColor: "white"
//                 }]
//             },
//             options: {
//                 legend: {display: false},
                
//                 title: {
//                 display: true,
//                 text: "Weekly User Creation",
//                 fontColor: "white"
//                 }
//             }
//             }); 
//         });
    
// }


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
    httpPostAsync(`http://localhost:8080/addMovie?userName=Inon&movieName=${movieName}&description=${movieDesc}&locations=${locations}&trailer=${trailer}&rate=0&duration=${duration}&director=${director}&stars=${stars}&img=${img}&releaseYear=${releaseYear}&genre=${genre}`,"",(value) => console.log(value))
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
        createPieChart();
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

        // var dateA = Date.parse(a._id);
        // var dateB = new Date(b._id);
        // console.log(dtA);
        // console.log(a);
        return dtA - dtB;
      });
    console.log(userStatisticsData);
    createUserBarChart(userStatisticsData,userStatLargest+5);
}

function custom_sort(a, b) {
    return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
}
