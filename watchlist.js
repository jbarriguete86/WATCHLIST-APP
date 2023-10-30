import {getFeedHtml, movieFetchId} from './utilities.js'

const mainFeedWatchlist = document.getElementById('feed-watchlist')
const storedData = localStorage.getItem("myWatchlist");
const receivedData = JSON.parse(storedData)
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
const getStoredData = () =>{
    if (storedData) {
        mainFeedWatchlist.innerHTML = ""
        savedId = receivedData
        console.log(savedId)
        savedId.forEach(async(element) =>{
            let movieEl = await movieFetchId(element)
            setFeed.unshift(getFeedHtml(movieEl, mainFeedWatchlist))
            mainFeedWatchlist.innerHTML = setFeed
        })}}



  document.addEventListener('click', e=>{
    
    // Remove button
    if (e.target.classList.contains("add-remove-btn")) {
        const feedDivId = e.target.closest(".feed").id
        const removeBtn =  document.querySelector(`.watchlist-button-${feedDivId}`)
        console.log(e)
          localStorage.removeItem("myWatchlist")
        console.log(storedData)
        console.log(feedDivId, removeBtn)
        savedId.pop(feedDivId)
        if(savedId){
            savedId.forEach(async(element) =>{
                let movieEl = await movieFetchId(element)
                setFeed.unshift(getFeedHtml(movieEl, mainFeedWatchlist))
                mainFeedWatchlist.innerHTML = setFeed
            })
        } else {
            mainFeedWatchlist.innerHTML = 
            `<div class="empty-feed">
            <p>Your watchlist is looking a little empty...</p>
            <a href="index.html"><img src="./Images/add_icon.png"> Let’s add some movies!</a>
            </div>`
        }
        

}

})

getStoredData()