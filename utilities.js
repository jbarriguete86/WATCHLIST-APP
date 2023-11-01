


const getFeedHtml = (movie,feedDiv) =>{
    return `
    <div class="feed" id="${movie.imdbID}">
        <img class="img-poster"
            src="${movie.Poster}"
            alt="${movie.Title} poster" />
        <h1 class="movie-title">${movie.Title} </h1>
        <p class="rate">⭐ ${movie.Ratings[0].Value.replace(/\/10$/, "")}</p>
        <p class="duration">${movie.Runtime}</p>
        <p class="genre">${movie.Genre}</p>
        <button class="watchlist-button-${movie.imdbID} add-remove-btn">
        <img src=${feedDiv.id === 'feed-search' ? "./Images/add_icon.png" : "./Images/remove_icon.png"}> 
        ${feedDiv.id === 'feed-search' ? "Watchlist" : "Remove"}</button>
        <p class="plot">${movie.Plot}
        </p>
    </div>
    <hr>
    `
}

// fetching the API
async function movieFetch(movieTitle){
    const res = await fetch(`https://www.omdbapi.com/?apikey=9814e296&t=${movieTitle}`)
    const data = await res.json()
        return data

}

async function movieFetchId(movieId){
    const res = await fetch(`https://www.omdbapi.com/?apikey=9814e296&i=${movieId}`)
    const data = await res.json()
        return data
}

// local storage functions
const saveLocalStorage = movieArray =>{
    const savedMovies = movieArray
    localStorage.setItem("myWatchlist", JSON.stringify(savedMovies))
}




export{getFeedHtml, movieFetch, movieFetchId, saveLocalStorage}

