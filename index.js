
import {getFeedHtml, movieFetch, movieFetchId} from './utilities.js'


const searchInput = document.getElementById('search-input')
const mainFeedSearch = document.getElementById('feed-search')
const storedData = localStorage.getItem("myWatchlist");
let moviesId = [] 
let savedId = []
let setFeed=[]




// localstorage access
// if (storedData) {
//     const receivedData = JSON.parse(storedData)
//     moviesId = receivedData
//     mainFeedSearch.innerHTML =""
//     console.log(moviesId)
//     moviesId.forEach(id =>{
//       fetch(`https://www.omdbapi.com/?apikey=9814e296&i=${id}`)
//               .then(res=> res.json())
//               .then(data => {
//                 mainFeedSearch.innerHTML +=getFeedHtml(data, mainFeedSearch)
//                   const button = document.querySelector(`.watchlist-button-${data.imdbID}`)
//                   button.innerHTML =`<img src="./Images/remove_icon.png"> Remove from watchlist`
//           })
//     })
    
//   }


 document.addEventListener('click', async (e)=>{
    // Search button
    if(e.target.id === 'search-btn'){
        if (searchInput.value !== ""){
            let movieEl = await movieFetch(searchInput.value)
            if(!moviesId.includes(movieEl.imdbID)){
                mainFeedSearch.innerHTML =''
                moviesId.unshift(movieEl.imdbID)
                setFeed.unshift(getFeedHtml(movieEl, mainFeedSearch))
                mainFeedSearch.innerHTML =setFeed
                searchInput.value = ""
            }
            
        }}
                
            
    // watchlist button
    if (e.target.classList.contains("add-remove-btn")) {
    const feedDivId = e.target.closest(".feed").id
    const watchlistBtn =  document.querySelector(`.watchlist-button-${feedDivId}`)
    if(watchlistBtn.innerHTML === `<img src="./Images/add_icon.png"> Watchlist`){
        savedId.includes(feedDivId) ? "" : savedId.unshift(feedDivId)
        watchlistBtn.innerHTML = `<img src="./Images/remove_icon.png"> Remove from watchlist`
        console.log(savedId)
    } else {
        watchlistBtn.innerHTML = `<img src="./Images/add_icon.png"> Watchlist`
        savedId.pop(feedDivId)
        console.log(savedId)
    }
  } 

//   My watchlist link
if (e.target.id === 'watchlist-page'){
    if(savedId){
        const savedMovies = savedId
        localStorage.setItem("myWatchlist", JSON.stringify(savedMovies))
    }
}
 })



