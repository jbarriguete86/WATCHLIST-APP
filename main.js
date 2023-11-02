import {getFeedHtml, getSearchFeed, movieFetch, movieFetchId, saveLocalStorage} from './utilities.js'


const searchInput = document.getElementById('search-input')
const searchHtml = document.getElementById('feed-search')
const watchlistHtml = document.getElementById('feed-watchlist')
const storedData = localStorage.getItem("myWatchlist")
const receivedData = JSON.parse(storedData)
let savedId=[]
let setFeed=[]
let moviesId = []

function loadLocalStorage(feedDiv){
        if (!receivedData.length <= 0) {
            feedDiv.innerHTML =""
            savedId = receivedData
            savedId.forEach(async(element) =>{
                let movieEl = await movieFetchId(element)
                setFeed.unshift(getFeedHtml(movieEl))
                feedDiv.innerHTML = setFeed
        })} else {
            feedDiv.innerHTML = 
            `<div class="empty-feed">
            <p>Your watchlist is looking a little empty...</p>
            <a href="index.html"><img src="./Images/add_icon.png"> Let's add some movies!</a>
            </div>`
        }
    
}

  


if (searchHtml){

    //----------------------------------search a movie code-----------------------------------------------------------------------------------------
    //localstorage access
    console.log(receivedData)

    if(receivedData){
        for (const data of receivedData){
            savedId.unshift(data)
        }
        savedId.forEach(async id =>{
            await getSearchFeed(moviesId, id, setFeed, searchHtml)
            document.querySelector(`.watchlist-button-${id}`).innerHTML = `<img src="./Images/remove_icon.png"> Remove from watchlist`
        })
            
        
        // getSearchFeed(moviesId, id, setFeed, searchHtml)
            // moviesId.forEach(storedMovie =>{
                // getSearchFeed(moviesId, storedMovie, setFeed, searchHtml)
            // })
        }
        
    
    // console.log(receivedData)
    // console.log(savedId)


    document.addEventListener('click', async (e)=>{
        // Search button
        if(e.target.id === 'search-btn'){
            if (searchInput.value !== ""){
            getSearchFeed(moviesId, searchInput.value, setFeed, searchHtml)           
            searchInput.value = ""
                }
                
            }
                    
                
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
            console.log(storedData)
        }
    }

})

} else if (watchlistHtml){
    
    //----------------------------------watchlist code-----------------------------------------------------------------------------------------
    //local storage access
    loadLocalStorage(watchlistHtml)

    console.log(receivedData)
    console.log(savedId)


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
                console.log(savedId)
                saveLocalStorage(savedId)
            }
        }

    })

}





