import {getFeedHtml, modifyFeed, loadFeed, handleWatchList, removeId, movieFetch, movieFetchId} from './utilities.js'


// search movies elements
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const searchHtml = document.getElementById('feed-search')
// watchlist elements
const watchlistHtml = document.getElementById('feed-watchlist')
// shared elements
const bodyEl = document.querySelector("body")
const mainContainer = document.getElementById('main-container')
const storedData = localStorage.getItem("myWatchlist")
const storedMode = localStorage.getItem("myDarkMode")
const darkBtn = document.getElementById("drk-btn")
let receivedData = JSON.parse(storedData)
let receivedMode = JSON.parse(storedMode)
let darkMode = false
let savedId=[]
let setFeed=[]
let moviesId = []

// Dark button functionality
const activeDark = ()=>{
    darkMode = true
    bodyEl.classList.add("dark-body")
    mainContainer.classList.add('dark-bckg')
    darkBtn.classList.add('dark-btn', 'dark-font1')
    darkBtn.innerText = "Dark mode"
    
}

const inactiveDark = ()=>{
    darkMode = false
    bodyEl.classList.remove("dark-body")
    mainContainer.classList.remove('dark-bckg')
    darkBtn.classList.remove('dark-btn', 'dark-font1')
    darkBtn.innerText = "Light mode"
    
}



// Rendering pages main functions
const renderMainPage = ()=>{
    window.addEventListener("load", async()=>{
        if(receivedMode){
            activeDark()
            searchBtn.classList.add('dark-btn', 'dark-font1')
            searchInput.classList.add('dark-input','dark-font1')
        } else{
            inactiveDark()
            searchBtn.classList.remove('dark-btn', 'dark-font1')
            searchInput.classList.remove('dark-input','dark-font1')
        }

        if(receivedData){
            for (const data of receivedData){
                moviesId.unshift(data)
                savedId.unshift(data)
            }
            await loadFeed(moviesId,receivedData,setFeed, receivedMode)
        
            searchHtml.innerHTML = setFeed.join("")
            receivedData = []
            receivedMode=[]
            } else{
             searchHtml.innerHTML =
             `
             <div class="empty-feed">
                <img src="./Images/Icon.png" alt="explore icon">
                <p>Start exploring</p>
                </div>
             `   
             receivedMode=[]
            }
    })

    

    document.addEventListener('click', async (e)=>{
        // Search button
        if(e.target.id === 'search-btn'){
            if (searchInput.value !== ""){
                const movieEl = await movieFetch(searchInput.value)
                if(!moviesId.includes(movieEl.imdbID)){
                    moviesId.unshift(movieEl.imdbID)
                    setFeed.unshift(await modifyFeed(searchInput.value, savedId, darkMode))
                }
                    searchInput.value=""
                    searchHtml.innerHTML = setFeed.join("")
                }
                
            }
                    
    if (e.target.classList.contains("add-remove-btn")) {
        const feedDivId = e.target.closest(".feed").id
        !savedId.includes(feedDivId) ? savedId.unshift(feedDivId) : removeId(feedDivId, savedId) 
        await loadFeed(moviesId,savedId,setFeed,darkMode)
            searchHtml.innerHTML = setFeed.join("")
      }

    //   Dark mode button
    if(e.target.id ==='drk-btn'){
        if(darkBtn.innerText === "Light mode"){
            activeDark()
            searchBtn.classList.add('dark-btn', 'dark-font1')
            searchInput.classList.add('dark-input','dark-font1')
            if (moviesId.length){
                await loadFeed(moviesId,savedId,setFeed, darkMode)
                searchHtml.innerHTML = setFeed.join("")
            } else{
                searchHtml.innerHTML =
             `
             <div class="empty-feed">
                <img src="./Images/Icon.png" alt="explore icon">
                <p>Start exploring</p>
                </div>
             `   
            }

        } else {
            inactiveDark()
            searchBtn.classList.remove('dark-btn', 'dark-font1')
            searchInput.classList.remove('dark-input','dark-font1')
            if (moviesId.length){
                await loadFeed(moviesId,savedId,setFeed, darkMode)
                searchHtml.innerHTML = setFeed.join("")
            } else{
                searchHtml.innerHTML =
             `
             <div class="empty-feed">
                <img src="./Images/Icon.png" alt="explore icon">
                <p>Start exploring</p>
                </div>
             `   
            }
        }

        
    }


    
    //   My watchlist link
    e.target.id === 'watchlist-page' && handleWatchList(darkMode, savedId)

   

})
}

const renderWatchlistPage = ()=>{
    window.addEventListener("load", async()=>{
        if(receivedMode){
           activeDark()
           if(receivedData){
               for (const data of receivedData){
                   moviesId.unshift(data)
                   savedId.unshift(data)
               }
               await loadFeed(moviesId,receivedData,setFeed, receivedMode)
               watchlistHtml.innerHTML = setFeed.join("")
               receivedData = []
               receivedMode=[]
               } else {
                   watchlistHtml.innerHTML = 
                   `<div class="empty-feed">
                   <p>Your watchlist is looking a little empty...</p>
                   <a class="${receivedMode ? "dark-font1" : "" }" href="index.html"><img id="empty-img" class="drk-img" src="./Images/add_icon.png"> Let's add some movies!</a>
                   </div>`
                   receivedMode=[]
               }} else {
                   inactiveDark()
                   if(receivedData){
                       for (const data of receivedData){
                           moviesId.unshift(data)
                           savedId.unshift(data)
                       }
                       await loadFeed(moviesId,savedId,setFeed, darkMode)
                       watchlistHtml.innerHTML = setFeed.join("")
                       receivedData = []
                       receivedMode=[]
                       } else {
                           watchlistHtml.innerHTML = 
                           `<div class="empty-feed">
                           <p>Your watchlist is looking a little empty...</p>
                           <a class="${receivedMode ? "dark-font1" : "" }" href="index.html"><img id="empty-img"  src="./Images/add_icon.png"> Let's add some movies!</a>
                           </div>`
                           receivedMode=[]
               }}

   })
   
 document.addEventListener('click', async(e)=>{
   
   // Remove button
   if (e.target.classList.contains("add-remove-btn")) {
       const feedDivId = e.target.closest(".feed").id
       savedId.includes(feedDivId) ? removeId(feedDivId, savedId) : ""
       setFeed=[]
       if(savedId.length){
           await loadFeed(savedId,savedId,setFeed, darkMode)
           watchlistHtml.innerHTML = setFeed.join("")
       } else {
           watchlistHtml.innerHTML = 
           `<div class="empty-feed">
           <p>Your watchlist is looking a little empty...</p>
           <a id="empty-watchlist" class="${darkMode ? "dark-font1" : "" }" href="index.html"><img id="empty-img" class=${darkMode ? "drk-img" : ""} src="./Images/add_icon.png"> Let's add some movies!</a>
           </div>`
           
       }
           
       }

       // Dark mode button
       if(e.target.id ==='drk-btn'){
           if(darkBtn.innerText === "Light mode"){
               activeDark()
               if(savedId.length){
                   await loadFeed(savedId,savedId,setFeed, darkMode)
                   watchlistHtml.innerHTML = setFeed.join("")
               } else{
                   watchlistHtml.innerHTML = 
                       `<div class="empty-feed">
                       <p>Your watchlist is looking a little empty...</p>
                       <a id="empty-watchlist" class="${darkMode ? "dark-font1" : "" }" href="index.html"><img id="empty-img" class="drk-img"src="./Images/add_icon.png"> Let's add some movies!</a>
                       </div>`

               } } else{
                   inactiveDark()
                   if(savedId.length){
                       await loadFeed(savedId,savedId,setFeed, darkMode)
                       watchlistHtml.innerHTML = setFeed.join("")
                   } else{
                       watchlistHtml.innerHTML = 
                           `<div class="empty-feed">
                           <p>Your watchlist is looking a little empty...</p>
                           <a id="empty-watchlist" class="${darkMode ? "dark-font1" : "" }" href="index.html"><img id="empty-img"  src="./Images/add_icon.png"> Let's add some movies!</a>
                           </div>`
               }
               
           }
       }

   
       // Search movies link
       e.target.id === 'search-page' && handleWatchList(darkMode, savedId)
           

   })
}


if (searchHtml){

    //----------------------------------search a movie code-----------------------------------------------------------------------------------------
    //localstorage access
    renderMainPage()



} else if (watchlistHtml){
    
    //----------------------------------watchlist code-----------------------------------------------------------------------------------------
    //local storage access
    renderWatchlistPage()

}


