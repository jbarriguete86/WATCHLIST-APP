


const getFeedHtml = (movie, movieArr) =>{
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
        <img src=${movieArr.includes(movie.imdbID) ?  "./Images/remove_icon.png" : "./Images/add_icon.png"}> 
        ${movieArr.includes(movie.imdbID) ?  "Remove" : "Watchlist"}</button>
        <p class="plot">${movie.Plot}
        </p>
    </div>
    <hr>
    `
}

async function getSearchFeed(movieArr, movie, htmlArr, feedDiv){
    let movieEl = movie.startsWith("tt") ? await movieFetchId(movie) : await movieFetch(movie)
    console.log(movieEl)
    if(!movieArr.includes(movieEl.imdbID)){
        feedDiv.innerHTML =''
        htmlArr.unshift(getFeedHtml(movieEl,movieArr))
        movieArr.unshift(movie.imdbID)
        feedDiv.innerHTML =htmlArr 
    }
          
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




export{getFeedHtml, getSearchFeed, movieFetch, movieFetchId, saveLocalStorage}

