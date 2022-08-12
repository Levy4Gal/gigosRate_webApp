let onUsers = true;

function changeOnUsers(state){
    onUsers = state;
    console.log(onUsers);
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
    console.log(txt);
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
    alert(movieName);
}