import {getFeedHtml, modifyFeed, removeId, movieFetch, movieFetchId, saveLocalStorage} from './utilities.js'


const searchInput = document.getElementById('search-input')
const searchHtml = document.getElementById('feed-search')
const watchlistHtml = document.getElementById('feed-watchlist')
const storedData = localStorage.getItem("myWatchlist")
let receivedData = JSON.parse(storedData)
let savedId=[]
let setFeed=[]
let moviesId = []



if (searchHtml){

    //----------------------------------search a movie code-----------------------------------------------------------------------------------------
    //localstorage access
    window.addEventListener("load", async(e)=>{
        if(receivedData){
            await Promise.all(receivedData.map(async(data) =>{
                moviesId.unshift(data)
                savedId.unshift(data)
                const newFeed = await modifyFeed(data, receivedData)
                const index = receivedData.indexOf(data)
                setFeed[index] = newFeed
            }))
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
                    setFeed.unshift(await modifyFeed(searchInput.value, savedId))
                }
                    searchInput.value=""
                    searchHtml.innerHTML = setFeed.join("")
                }
                
            }
                    
    if (e.target.classList.contains("add-remove-btn")) {
        const feedDivId = e.target.closest(".feed").id
        !savedId.includes(feedDivId) ? savedId.unshift(feedDivId) : removeId(feedDivId, savedId) 
            await Promise.all(moviesId.map(async(id) =>{
                const newFeed = await modifyFeed(id, savedId)
                const index = moviesId.indexOf(id)
                setFeed[index] = newFeed
            }))
            searchHtml.innerHTML = setFeed.join("")
      }



    
    //   My watchlist link
    if (e.target.id === 'watchlist-page'){
        if(savedId.length > 0){
            saveLocalStorage(savedId)
        }else{
            localStorage.removeItem('myWatchlist')
        }
        
        
    }

})

} else if (watchlistHtml){
    
    //----------------------------------watchlist code-----------------------------------------------------------------------------------------
    //local storage access
    if(receivedData){
        await Promise.all(receivedData.map(async(data) =>{
            moviesId.unshift(data)
            savedId.unshift(data)
            const newFeed = await modifyFeed(data, receivedData)
            const index = receivedData.indexOf(data)
            setFeed[index] = newFeed
        }))
        watchlistHtml.innerHTML = setFeed.join("")
        receivedData = []
        } else {
            watchlistHtml.innerHTML = 
            `<div class="empty-feed">
            <p>Your watchlist is looking a little empty...</p>
            <a href="index.html"><img src="./Images/add_icon.png"> Let's add some movies!</a>
            </div>`

        }




  document.addEventListener('click', async(e)=>{
    
    // Remove button
    if (e.target.classList.contains("add-remove-btn")) {
        const feedDivId = e.target.closest(".feed").id
        savedId.includes(feedDivId) ? removeId(feedDivId, savedId) : ""
        setFeed=[]
        if(savedId.length>0){
            await Promise.all(savedId.map(async(id) =>{
                const newFeed = await modifyFeed(id, savedId)
                const index = savedId.indexOf(id)
                setFeed[index] = newFeed 
            }))
            watchlistHtml.innerHTML = setFeed.join("")
        } else {
            watchlistHtml.innerHTML = 
            `<div class="empty-feed">
            <p>Your watchlist is looking a little empty...</p>
            <a href="index.html"><img src="./Images/add_icon.png"> Let's add some movies!</a>
            </div>`
            
        }
            
        }

    
        if (e.target.id === 'search-page'){
            if(savedId.length >0){
                saveLocalStorage(savedId)
            } else{
                localStorage.removeItem('myWatchlist')
            }
        }

    })

}






