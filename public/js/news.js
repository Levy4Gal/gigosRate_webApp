// array of articles from the API call.
var MovieArticles = [];
var titles = [];

$(document).ready(() => {
    // API call parameters.
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://free-news.p.rapidapi.com/v1/search?q=movies&lang=en",
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "3b058123a0msh0e0196070ea0c62p1db3c0jsnb7072f6f4da4",
            "X-RapidAPI-Host": "free-news.p.rapidapi.com"
        }
    };
    
    // Waiting for API response.
    $.ajax(settings).done(function (response) {
        var arr = response.articles;
        for(var i=0;i<=24;i++){
            if(arr[i] == null){
                break;
            }
            // Get the articles from the US.
            if(arr[i].country == "US" && arr[i].rights != "reddit.com"){
                // cheks if there is any duplicate title names.
                if(titles.includes(arr[i].title) == false){
                    MovieArticles.push(arr[i]);
                    titles.push(arr[i].title);
            }
            }
        }
        updateArticles();    
    });
  });

  // Update the news html page.
function updateArticles(){
    updateAllArticles(1,2);
    updateAllArticles(2,3);
    updateAllArticles(3,4);
    updateAllArticles(4,5);
    updateAllArticles(5,6);
    updateAllArticles(6,7);
    updateAllArticles(7,8);
    updateAllArticles(8,9);
    popular(1,9);
    popular(2,10);
    popular(3,11);
    popular(4,12);
}

  // Update the news html page.
function updateAllArticles(index,num){
    $("#pic"+index).attr("src",MovieArticles[num].media);
    $("#date"+index).text(MovieArticles[num].published_date.substring(0,16));
    $("#title"+index).text(MovieArticles[num].title);
    $("#continue"+index).attr("href", MovieArticles[num].link);
}

  // Update the news html page.
function popular(index,num){
    $("#pop"+index).text(MovieArticles[num].title);
    $("#pop"+index).attr("href", MovieArticles[num].link);
}