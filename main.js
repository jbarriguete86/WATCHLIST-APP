import {getFeedHtml, modifyFeed, loadFeed, removeId, movieFetch, movieFetchId} from './utilities.js'


// search movies elements
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const searchHtml = document.getElementById('feed-search')
// watchlist elements
const watchlistHtml = document.getElementById('feed-watchlist')
const emptyWatchlist = document.getElementById('empty-watchlist')
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

const activeDark = ()=>{
    bodyEl.classList.add("dark-body")
    mainContainer.classList.add('dark-bckg')
    darkBtn.classList.add('dark-btn', 'dark-font1')
    darkBtn.innerText = "Dark mode"
    darkMode = true
}

const inactiveDark = ()=>{
    bodyEl.classList.remove("dark-body")
    mainContainer.classList.remove('dark-bckg')
    darkBtn.classList.remove('dark-btn', 'dark-font1')
    darkBtn.innerText = "Light mode"
    darkMode = false
}



if (searchHtml){

    //----------------------------------search a movie code-----------------------------------------------------------------------------------------
    //localstorage access
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
            await loadFeed(moviesId,savedId,setFeed, darkMode)
        
            searchHtml.innerHTML = setFeed.join("")
            receivedData = []
            } else{
             searchHtml.innerHTML =
             `
             <div class="empty-feed">
                <img src="./Images/Icon.png" alt="explore icon">
                <p>Start exploring</p>
                </div>
             `   
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
        } else {
            inactiveDark()
            searchBtn.classList.remove('dark-btn', 'dark-font1')
            searchInput.classList.remove('dark-input','dark-font1')
        }

        if (moviesId.length>0){
            await loadFeed(moviesId,savedId,setFeed, darkMode)
            searchHtml.innerHTML = setFeed.join("")
        }
    }


    
    //   My watchlist link
    if (e.target.id === 'watchlist-page'){
        localStorage.setItem("myDarkMode", JSON.stringify(darkMode))

        if(savedId.length > 0){
            localStorage.setItem("myWatchlist", JSON.stringify(savedId))
        }else{
            localStorage.removeItem('myWatchlist')
        }
        
        
    }

   

})


} else if (watchlistHtml){
    
    //----------------------------------watchlist code-----------------------------------------------------------------------------------------
    //local storage access
    window.addEventListener("load", async()=>{
         if(receivedMode){
            activeDark()
            emptyWatchlist.classList.add('dark-font1')
        } else{
            inactiveDark()
        }
        if(receivedData){
            for (const data of receivedData){
                moviesId.unshift(data)
                savedId.unshift(data)
            }
            await loadFeed(moviesId,savedId,setFeed, darkMode)
            watchlistHtml.innerHTML = setFeed.join("")
            receivedData = []
            } else {
                console.log(receivedMode)
                watchlistHtml.innerHTML = 
                `<div class="empty-feed">
                <p>Your watchlist is looking a little empty...</p>
                <a id="empty-watchlist" class="${receivedMode ? emptyWatchlist.classList.add('dark-font1') : "" }" href="index.html"><img src="./Images/add_icon.png"> Let's add some movies!</a>
                </div>`
    
            }
    })
    




  document.addEventListener('click', async(e)=>{
    
    // Remove button
    if (e.target.classList.contains("add-remove-btn")) {
        const feedDivId = e.target.closest(".feed").id
        savedId.includes(feedDivId) ? removeId(feedDivId, savedId) : ""
        setFeed=[]
        if(savedId.length>0){
            await loadFeed(savedId,savedId,setFeed, darkMode)
            watchlistHtml.innerHTML = setFeed.join("")
        } else {
            console.log(darkMode)
            watchlistHtml.innerHTML = 
            `<div class="empty-feed">
            <p>Your watchlist is looking a little empty...</p>
            <a id="empty-watchlist" class="${darkMode ? emptyWatchlist.classList.add('dark-font1') : "" }" href="index.html"><img src="./Images/add_icon.png"> Let's add some movies!</a>
            </div>`
            
        }
            
        }

        // Dark mode button
        if(e.target.id ==='drk-btn'){
            if(darkBtn.innerText === "Light mode"){
                activeDark()
                console.log(emptyWatchlist)
                emptyWatchlist.classList.add('dark-font1')
                
            } else {
                inactiveDark()
                emptyWatchlist.classList.remove('dark-font1')
            }
    
            if (savedId.length>0){
                await loadFeed(savedId,savedId,setFeed, darkMode)
                watchlistHtml.innerHTML = setFeed.join("")
            }
        }

    
        // Search movies link
        if (e.target.id === 'search-page'){
            localStorage.setItem("myDarkMode", JSON.stringify(darkMode))
            
            if(savedId.length >0){
                localStorage.setItem("myWatchlist", JSON.stringify(savedId))
            } else{
                localStorage.removeItem('myWatchlist')
            }
        }

    })

}






