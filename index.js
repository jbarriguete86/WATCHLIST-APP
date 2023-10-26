const searchBtn= document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
const mainFeed = document.getElementById('main-feed')
let FeedHtml =[]
let moviesId = []


searchBtn.addEventListener('click', ()=>{
    if (searchInput.value !== ""){
        const movieName= searchInput.value
        fetch(`https://www.omdbapi.com/?apikey=9814e296&t=${movieName}`)
        .then(res=> res.json())
        .then(data => {
            moviesId.unshift(`${data.imdbID}`)
            const savedMovies = JSON.stringify(moviesId)
            localStorage.setItem("watchlist", savedMovies)
            console.log(moviesId)
            FeedHtml.unshift (`
            <div class="feed">
                <img class="img-poster"
                    src="${data.Poster}"
                    alt="${data.Title} poster" />
                <h1 class="movie-title">${data.Title} </h1>
                <p class="rate">⭐ ${data.Ratings[0].Value.replace(/\/10$/, "")}</p>
                <p class="duration">${data.Runtime}</p>
                <p class="genre">${data.Genre}</p>
                <button id="watchlist-btn" class="watchlist-button"><img src="./Images/add_icon.png"> Watchlist</button>
                <p class="plot">${data.Plot}
                </p>
            </div>
            <hr>
            `)
            mainFeed.innerHTML = FeedHtml.join('')
    
        })
        searchInput.value = ""
    } 
})

 