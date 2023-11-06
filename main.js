import {getFeedHtml, movieFetch, movieFetchId, saveLocalStorage} from './utilities.js'


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
            for (const data of receivedData){
                const movieEl = data.startsWith("tt") ? await movieFetchId(data) : await movieFetch(data)
                moviesId.unshift(data)
                savedId.unshift(data)
                setFeed.unshift(await getFeedHtml(movieEl, receivedData))
                searchHtml.innerHTML = setFeed
            }
            receivedData = ""
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
            console.log(savedId)
            if (searchInput.value !== ""){
                    const movieEl = searchInput.value.startsWith("tt") ? await movieFetchId(searchInput.value) : await movieFetch(searchInput.value)
                    if(!moviesId.includes(movieEl.imdbID)){
                        setFeed.unshift(await getFeedHtml(movieEl, savedId))
                        console.log(setFeed)
                        moviesId.unshift(movieEl.imdbID)
                    }
                 searchHtml.innerHTML = setFeed
                //  savedId.forEach(id =>{
                //     if(moviesId.includes(id)){
                //         const watchlistBtn = document.querySelector(`.watchlist-button-${id}`)
                //         watchlistBtn.innerHTML =`<img src="./Images/remove_icon.png"> Remove from watchlist`
                //     } else {
                //         watchlistBtn.innerHTML = `<img src="./Images/add_icon.png"> Watchlist`
                //     }
                    
                //  })
                }
                
            }
                    
    if (e.target.classList.contains("add-remove-btn")) {
        const feedDivId = e.target.closest(".feed").id
        const watchlistBtn =  document.querySelector(`.watchlist-button-${feedDivId}`)
        console.log(savedId)
        console.log(moviesId)
        if (!savedId.includes(feedDivId)){
            savedId.unshift(feedDivId)
            watchlistBtn.innerHTML = `<img src="./Images/remove_icon.png"> Remove from watchlist`
            console.log(savedId)
        console.log(moviesId)
        } else{
            const index = savedId.indexOf(feedDivId)
            savedId.splice(index, 1)
            moviesId.splice(index,1)
            watchlistBtn.innerHTML = `<img src="./Images/add_icon.png"> Watchlist`
            console.log(savedId)
            console.log(moviesId)
        } 
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
        for (const data of receivedData){
            const movieEl = data.startsWith("tt") ? await movieFetchId(data) : await movieFetch(data)
            moviesId.unshift(data)
            savedId.unshift(data)
            setFeed.unshift(await getFeedHtml(movieEl, receivedData))
            watchlistHtml.innerHTML = setFeed
        }
        receivedData = ""
        } else {
            watchlistHtml.innerHTML = 
            `<div class="empty-feed">
            <p>Your watchlist is looking a little empty...</p>
            <a href="index.html"><img src="./Images/add_icon.png"> Let's add some movies!</a>
            </div>`

        }




  document.addEventListener('click', e=>{
    
    // Remove button
    if (e.target.classList.contains("add-remove-btn")) {
        const feedDivId = e.target.closest(".feed").id
        const index = savedId.indexOf(feedDivId)
        setFeed=[]
        savedId.splice(index,1)
        if(savedId.length>0){
            savedId.forEach(async(id) =>{
                const movieEl = id.startsWith("tt") ? await movieFetchId(id) : await movieFetch(id)
                setFeed.unshift(await getFeedHtml(movieEl,savedId))
                watchlistHtml.innerHTML = setFeed 
            })
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






