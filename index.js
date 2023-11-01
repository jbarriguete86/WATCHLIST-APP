
import {getFeedHtml, movieFetch, movieFetchId, saveLocalStorage} from './utilities.js'


const searchInput = document.getElementById('search-input')
const mainFeedSearch = document.getElementById('feed-search')
const storedData = localStorage.getItem("myWatchlist")
const receivedData = JSON.parse(storedData)
let moviesId = [] 
let savedId = []
let setFeed=[]

function loadLocalStorage(){
    if (!receivedData.length <= 0) {
        mainFeedSearch.innerHTML =""
    savedId = receivedData
    savedId.forEach(async(element) =>{
        let movieEl = await movieFetchId(element)
        setFeed.unshift(getFeedHtml(movieEl, mainFeedWatchlist))
        mainFeedWatchlist.innerHTML = setFeed
})} else {
    mainFeedWatchlist.innerHTML = 
    `<div class="empty-feed">
    <p>Your watchlist is looking a little empty...</p>
    <a href="index.html"><img src="./Images/add_icon.png"> Let's add some movies!</a>
    </div>`
}
}

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
    console.log(watchlistBtn)
    if (!savedId.includes(feedDivId)){
        savedId.unshift(feedDivId)
        watchlistBtn.innerHTML = `<img src="./Images/remove_icon.png"> Remove from watchlist`
        console.log(savedId)
    } else{
        const index = savedId.indexOf(feedDivId)
        savedId.splice(index, 1)
        watchlistBtn.innerHTML = `<img src="./Images/add_icon.png"> Watchlist`
        console.log(savedId)
    } 
  } 

//   My watchlist link
if (e.target.id === 'watchlist-page'){
    if(savedId){
        saveLocalStorage(savedId)
    }
}
 })




