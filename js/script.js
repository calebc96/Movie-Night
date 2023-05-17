// url to send request
let requestUrl = 'https://www.omdbapi.com/?apikey=544f655e&t='
var searchboxEL = document.getElementById("search-box");
var userinput;
var historyEL = document.getElementById("historylist");
// OMDb API Key
const APIKey = '544f655e'

// variable to insert js api results into HTML
const movieGrid = document.getElementById('result-movie');

// Search box variable grabs input field from html with id of search-box
const searchBox = document.getElementById('search-box')

var button = document.getElementById('button')

button.addEventListener("click", function (event) {
  event.preventDefault();
  searchMovies();
  
 
});
// Seach movie results from the APi
async function searchMovies() {
  const movie = searchBox.value;
  // creates the url based on what is typed into the search box
  const movieSearchUrl = new URL(`${requestUrl}${movie}`);


  const response = await fetch(movieSearchUrl);

  // function still needs input for what to display during a 404 error
  if (response.status === 404) {

    return;
  }
  // creating a json string to parse and output data to HTML
  const data = await response.json();

  // inserting api information into empty div with an id of result-movie
  // need a placeholder image for if poster does not exist
  
  userinput = data.Title;
  released = data.Released;
 
  actors = data.Actors;
  kaismegamoviefunction(userinput,released,actors);
  searchhistory(userinput);
    var moviePoster = document.getElementById('movie-poster')
    moviePoster.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(data.Poster != "N/A") ? data.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    `
    movieGrid.innerHTML = `
    <div class = "movie-info">
        <h3 class = "movie-title"><b>Movie</b>: ${data.Title}</h3>
        <p class = "rated"><b>Ratings</b>: ${data.Rated}</p>
        <p class = "released"><b>Released</b>: ${data.Released}</p>
        <p class = "genre"><b>Genre:</b> ${data.Genre}</p>
        <p class = "actors"><b>Actors: </b>${data.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${data.Plot}</p>
        <p class = "awards"><b>Awards:<i class = "fas fa-award"></i></b> ${data.Awards}</p>
    </div>
    `;

}

//kais youtube section
function kaismegamoviefunction(userinput,released,actors) {
    //slice to only get the released year
    
    released = released.slice(6,11);
  console.log("userinput:",userinput);
  console.log("releaseddate",released);
  if(userinput == undefined || released == "N/A"){
    return;
  }
  console.log("this function is running!");
  // kais key let key = "AIzaSyCY_952gGjBqylPvw16_rgi2pB2NI6aoPk";
  let key = "AIzaSyCNirqDt4O3qnoMFaSPZu1XhhRuMhZmjIQ";
  let newyoutubeURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" +userinput+" "+released+" " + "movie trailer&key=" + key;

  console.log("this is the new URL", newyoutubeURL);

  
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  console.log(tag.src);

  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  onYouTubeIframeAPIReady();
  function onYouTubeIframeAPIReady() {

    fetch(newyoutubeURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log("youtube", data);
        console.log("vid id", data.items[0].id.videoId);
        return data.items[0].id.videoId
      }).then(function (videoId) {
        player = new YT.Player('utube', {
          height: '450',
          width: 'auto',
          //change videoid to change what video plays
          videoId: videoId,
          playerVars: {
            'playsinline': 1
          },
          events: {
            //un comment below for auto play
            //'onReady': onPlayerReady,  
            'onStateChange': onPlayerStateChange
          }
        });
      });
  }
  //destroys player when new search is made via click
  button.addEventListener("click", function () {
    player.destroy();
    
})
  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();
  }
  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {

      done = true;
    
  }


}
}


function searchhistory(userinput){
     
  var storedinputs = JSON.parse(localStorage.getItem('history')) || [];
  var searchhistory = {
      userentered: userinput,
  };
  storedinputs.push(searchhistory);
  localStorage.setItem('history', JSON.stringify(storedinputs));
  let historyLI = document.createElement("li");
  
historyLI.innerHTML = "- " + userinput;
historyEL.appendChild(historyLI);
document.getElementById("deletehistory").classList.remove('hidden')
}
function deletehistory(){
  localStorage.removeItem('history');
  historyEL.innerHTML= "";
  document.getElementById("deletehistory").classList.add("hidden")
}
document.getElementById("deletehistory").addEventListener("click", deletehistory)

init();
function init(){
      retrieveddata = localStorage.getItem("history");
      var storagearray = JSON.parse(retrieveddata);
    
      if(storagearray !== null){
      for(var i=0; i<storagearray.length; i++){
        var temp =storagearray[i]
        let searchhistory  = document.createElement("li");
searchhistory.innerHTML = "- " + temp.userentered;
historyEL.appendChild(searchhistory);
document.getElementById("deletehistory").classList.remove('hidden')

      }}
    
    }
