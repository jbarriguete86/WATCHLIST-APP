import {getFeedHtml, movieFetch, movieFetchId, saveLocalStorage} from './utilities.js'

const storedData = localStorage.getItem("myWatchlist");
const receivedData = JSON.parse(storedData)
const mainFeedWatchlist = document.getElementById('feed-watchlist')
let savedId=[]
let setFeed=[]


//local storage access
function loadLocalStorage(){
    if (!receivedData.length <= 0) {
    mainFeedWatchlist.innerHTML =""
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
            loadLocalStorage() 
            
        }
    
        if (e.target.id === 'search-page'){
            if(savedId){
                saveLocalStorage(savedId)
            }
        }

    })


        
    

loadLocalStorage()