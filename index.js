const searchBtn= document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
const mainFeedSearch = document.getElementById('feed-search')
let getFeed =[]
let moviesId = []

const FeedHtml = movie =>{
    getFeed.unshift (`
    <div class="feed" id="${movie.imdbID}">
        <img class="img-poster"
            src="${movie.Poster}"
            alt="${movie.Title} poster" />
        <h1 class="movie-title">${movie.Title} </h1>
        <p class="rate">⭐ ${movie.Ratings[0].Value.replace(/\/10$/, "")}</p>
        <p class="duration">${movie.Runtime}</p>
        <p class="genre">${movie.Genre}</p>
        <button class="watchlist-button"><img src="./Images/add_icon.png"> Watchlist</button>
        <p class="plot">${movie.Plot}
        </p>
    </div>
    <hr>
    `)
    mainFeedSearch.innerHTML = getFeed.join('')
}


searchBtn.addEventListener('click', ()=>{
    if (searchInput.value !== ""){
        const movieName= searchInput.value
        fetch(`https://www.omdbapi.com/?apikey=9814e296&t=${movieName}`)
        .then(res=> res.json())
        .then(data => {
            if(!moviesId.includes(data.imdbID)){
            FeedHtml(data)
        }else{
            alert("This movie is already in the checklist")
        }
    }) 
            
        searchInput.value = ""
    } 
})



document.addEventListener('click', e=>{
    if (event.target.classList.contains("watchlist-button")) {
    const feedDivId = event.target.closest(".feed").id;
    moviesId.includes(feedDivId) ? "" : moviesId.unshift(feedDivId)
    const savedMovies = JSON.stringify(moviesId)
    localStorage.setItem("watchlist", savedMovies)
    console.log(savedMovies) 
  }
})

