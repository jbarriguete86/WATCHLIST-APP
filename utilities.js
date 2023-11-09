


// fetching the API
const movieFetch =async movieTitle =>{
    const res = await fetch(`https://www.omdbapi.com/?apikey=9814e296&t=${movieTitle}`)
    const data = await res.json()
        return data

}

const movieFetchId = async movieId =>{
    const res = await fetch(`https://www.omdbapi.com/?apikey=9814e296&i=${movieId}`)
    const data = await res.json()
        return data
}


//manipulating the feed

const getFeedHtml = async (movie, movieArr,drkMode) =>{
        return `
    <div class="feed ${drkMode ? "dark-bckg" : " "}" id="${movie.imdbID}">
        <img class="img-poster"
            src="${movie.Poster}"
            alt="${movie.Title} poster" />
        <h1 class="movie-title ${drkMode ? "dark-font1" : " "}">${movie.Title} </h1>
        <p class="rate ${drkMode ? "dark-font1" : " "}">⭐ ${movie.Ratings[0].Value.replace(/\/10$/, "")}</p>
        <p class="duration ${drkMode ? "dark-font1" : " "}">${movie.Runtime}</p>
        <p class="genre ${drkMode ? "dark-font1" : " "}">${movie.Genre}</p>
        <button class="watchlist-button-${movie.imdbID} add-remove-btn ${drkMode ? "dark-font1" : " "}">
        <img id="add-remove-img" class=${drkMode ? "drk-img" : ""} src=${movieArr.includes(movie.imdbID) ?  "./Images/remove_icon.png" : "./Images/add_icon.png" }> 
        ${movieArr.includes(movie.imdbID) ?  "Remove from watchlist" : "Watchlist"}</button>
        <p class="plot ${drkMode ? "dark-font2" : " "}">${movie.Plot}
        </p>
    </div>
    <hr>
    `  
}

const modifyFeed = async(movie, movieArr, drkMode) =>{
    const movieEl = movie.startsWith("tt") ? await movieFetchId(movie) : await movieFetch(movie)
    return getFeedHtml(movieEl, movieArr, drkMode)
}

const loadFeed = async (movieArr, savedArr, stringArr, drkMode) =>{
    await Promise.all(movieArr.map(async(id) =>{
        const newFeed = await modifyFeed(id, savedArr, drkMode)
        const index = movieArr.indexOf(id)
        stringArr[index] = newFeed
}))}


const removeId = (idEl, movieArr) =>{
    const Index = movieArr.indexOf(idEl)
    movieArr.splice(Index, 1)
}

// local storage functions





export{getFeedHtml, modifyFeed, loadFeed, removeId, movieFetch, movieFetchId}




