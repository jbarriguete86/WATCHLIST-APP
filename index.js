
const searchInput = document.getElementById('search-input')
const mainFeedSearch = document.getElementById('feed-search')
const mainFeedWatchlist = document.getElementById('feed-watchlist')
let getFeed =[]
let moviesId = []

const getFeedHtml = movie =>{
    getFeed.unshift (`
    <div class="feed" id="${movie.imdbID}">
        <img class="img-poster"
            src="${movie.Poster}"
            alt="${movie.Title} poster" />
        <h1 class="movie-title">${movie.Title} </h1>
        <p class="rate">⭐ ${movie.Ratings[0].Value.replace(/\/10$/, "")}</p>
        <p class="duration">${movie.Runtime}</p>
        <p class="genre">${movie.Genre}</p>
        <button class="watchlist-button-${movie.imdbID} add-remove-btn"><img src="./Images/add_icon.png"> Watchlist</button>
        <p class="plot">${movie.Plot}
        </p>
    </div>
    <hr>
    `)
}


document.addEventListener('click', e=>{
    // Search button
    if(e.target.id === 'search-btn'){
        if (searchInput.value !== ""){
            const movieName= searchInput.value
            fetch(`https://www.omdbapi.com/?apikey=9814e296&t=${movieName}`)
            .then(res=> res.json())
            .then(data => {
                if(!moviesId.includes(data.imdbID)){
                getFeedHtml(data)
                mainFeedSearch.innerHTML = getFeed.join('')
                moviesId.push(data.imdbID)
            }else{
                alert("This movie is already in the checklist")
            }
        }) 
                
            searchInput.value = ""
        } 
    }
    
    // watchlist button
    if (e.target.classList.contains("add-remove-btn")) {
    const feedDivId = e.target.closest(".feed").id
    const watchlistBtn =  document.querySelector(`.watchlist-button-${feedDivId}`)
    if(watchlistBtn.innerHTML === `<img src="./Images/add_icon.png"> Watchlist`){
        moviesId.includes(feedDivId) ? "" : moviesId.unshift(feedDivId)
        const savedMovies = JSON.stringify(moviesId)
        localStorage.setItem("watchlist", savedMovies)
        watchlistBtn.innerHTML = `<img src="./Images/remove_icon.png"> Remove from watchlist`
        console.log(savedMovies)
    } else {
        watchlistBtn.innerHTML = `<img src="./Images/add_icon.png"> Watchlist`
        localStorage.removeItem(feedDivId)
        moviesId.pop(feedDivId)
    }
  } 

//   My watchlist link
if (e.target.id === 'watchlist-page'){
    savedMovies.forEach(element => {
        fetch(`https://www.omdbapi.com/?apikey=9814e296&t=${element}`)
            .then(res=> res.json())
            .then(data => {
                if(!moviesId.includes(data.imdbID)){
                getFeedHtmlFeedHtml(data)
                mainFeedWatchlist.innerHTML = getFeed.join('')
                moviesId.push(data.imdbID)
                }
    });
    

})}})

