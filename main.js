import {getFeedHtml, movieFetch, movieFetchId, saveLocalStorage} from './utilities.js'


const searchInput = document.getElementById('search-input')
const searchHtml = document.getElementById('feed-search')
const watchlistHtml = document.getElementById('feed-watchlist')
const storedData = localStorage.getItem("myWatchlist")
const receivedData = JSON.parse(storedData)
let savedId=[]
let setFeed=[]
let moviesId = [] 

console.log(receivedData)
function loadLocalStorage(feedDiv){
    if(feedDiv === watchlistHtml){
        console.log(receivedData.length)
        if (!receivedData.length <= 0) {
            feedDiv.innerHTML =""
            console.log(receivedData)
            savedId = receivedData
            console.log(savedId)
            savedId.forEach(async(element) =>{
                let movieEl = await movieFetchId(element)
                setFeed.unshift(getFeedHtml(movieEl, feedDiv))
                feedDiv.innerHTML = setFeed
        })} else {
            feedDiv.innerHTML = 
            `<div class="empty-feed">
            <p>Your watchlist is looking a little empty...</p>
            <a href="index.html"><img src="./Images/add_icon.png"> Let's add some movies!</a>
            </div>`
        }
    } else {
        
        if (!receivedData.length <= 0) {
            feedDiv.innerHTML =""
            savedId = receivedData
            console.log(savedId)
            savedId.forEach(async(element) =>{
                let movieEl = await movieFetchId(element)
                setFeed.unshift(getFeedHtml(movieEl, feedDiv))
                feedDiv.innerHTML = setFeed
                const addRemoveBtn = document.querySelector(`.watchlist-button-${movieEl.imdbID}`)
                addRemoveBtn.innerHTML = `<img src="./Images/remove_icon.png"> Remove from watchlist`
        })} else {
            feedDiv.innerHTML = 
            `<div class="empty-feed">
            <img src="./Images/Icon.png" alt="explore icon">
            <p>Start exploring</p>
            </div>`
        }
    }
   
}

if (searchHtml){

    //----------------------------------search a movie code-----------------------------------------------------------------------------------------
    //localstorage access
    if (storedData) {
        loadLocalStorage(searchHtml)
        
          }
    
    

    document.addEventListener('click', async (e)=>{
        // Search button
        if(e.target.id === 'search-btn'){
            if (searchInput.value !== ""){
                let movieEl = await movieFetch(searchInput.value)
                if(!moviesId.includes(movieEl.imdbID)){
                    searchHtml.innerHTML =''
                    moviesId.unshift(movieEl.imdbID)
                    setFeed.unshift(getFeedHtml(movieEl, searchHtml))
                    searchHtml.innerHTML =setFeed
                    searchInput.value = ""
                }
                
            }}
                    
                
        // watchlist button
    //     if (e.target.classList.contains("add-remove-btn")) {
    //     const feedDivId = e.target.closest(".feed").id
    //     const watchlistBtn =  document.querySelector(`.watchlist-button-${feedDivId}`)
    //     if (!savedId.includes(feedDivId)){
    //         savedId.unshift(feedDivId)
    //         watchlistBtn.innerHTML = `<img src="./Images/remove_icon.png"> Remove from watchlist`
    //         console.log(savedId)
    //     } else{
    //         const index = savedId.indexOf(feedDivId)
    //         savedId.splice(index, 1)
    //         watchlistBtn.innerHTML = `<img src="./Images/add_icon.png"> Watchlist`
    //         console.log(savedId)
    //     } 
    //   } 

    if (e.target.classList.contains("add-remove-btn")) {
        const feedDiv = e.target.closest(".feed");
        const movieId = feedDiv.id;
        if (!inWatchlist) {
            savedId.unshift(movieId);
            console.log(savedId)
        } else {
            const index = savedId.indexOf(movieId);
            savedId.splice(index, 1);
            console.log(savedId)
        }

        feedDiv.dataset.inWatchlist = (!inWatchlist).toString();
        e.target.innerHTML = `<img src="${inWatchlist ? "./Images/add_icon.png" : "./Images/remove_icon.png"}"> ${inWatchlist ? "Watchlist" : "Remove from watchlist"}`;
    }




    
    //   My watchlist link
    if (e.target.id === 'watchlist-page'){
        if(savedId){
            saveLocalStorage(savedId)
            console.log(storedData)
        }
    }
     })

} else if (watchlistHtml){
    
    //----------------------------------watchlist code-----------------------------------------------------------------------------------------
    //local storage access
    loadLocalStorage(watchlistHtml)


  document.addEventListener('click', e=>{
    
    // Remove button
    if (e.target.classList.contains("add-remove-btn")) {
        const feedDivId = e.target.closest(".feed").id
        const removeBtn =  document.querySelector(`.watchlist-button-${feedDivId}`)
        const index = savedId.indexOf(feedDivId)
        console.log(savedId)
        savedId.splice(index, 1)
            setFeed=[]
            localStorage.clear()
            saveLocalStorage(savedId)
            loadLocalStorage(watchlistHtml) 
            
        }
    
        if (e.target.id === 'search-page'){
            if(savedId){
                saveLocalStorage(savedId)
            }
        }

    })

}





