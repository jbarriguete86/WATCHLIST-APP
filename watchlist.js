import {getFeedHtml, movieFetch, movieFetchId, saveLocalStorage, deleteLocalStorage, } from './utilities.js'

const storedData = localStorage.getItem("myWatchlist");
const receivedData = JSON.parse(storedData)
const mainFeedWatchlist = document.getElementById('feed-watchlist')
let savedId=[]
let setFeed=[]


const fetchApi = id =>{
    mainFeedWatchlist.innerHTML = ""
    fetch(`https://www.omdbapi.com/?apikey=9814e296&i=${id}`)
              .then(res=> res.json())
              .then(data => {
                mainFeedWatchlist.innerHTML +=getFeedHtml(data, mainFeedWatchlist)
          })
}

//local storage access
function loadLocalStorage(){
    console.log(receivedData.length)
    if (receivedData.length >= 0) {
    mainFeedWatchlist.innerHTML =""
    savedId = receivedData
    console.log(receivedData)
    console.log(savedId)
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
        savedId.pop(feedDivId)
        if(!savedId.length >= 0){
            console.log(savedId)
            setFeed=[]
            deleteLocalStorage()
            saveLocalStorage(savedId)
            loadLocalStorage()
            } 
        
        }})
    

loadLocalStorage()