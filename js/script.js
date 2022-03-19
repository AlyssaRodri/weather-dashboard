var appid = "529d0fda063cc140a2b1932e2f58436f";
var showRecentSearches = localStorage.getItem("cities")
var userInput = ""

//Here I created a function to display the items set in local storage
function showSearchHistory(){
    //if there are no searches in local storage
    if( showRecentSearches === null ){
        console.log("There are no searches logged.")
    }else if(showRecentSearches != null){
        //if there are items in the storage
        //https://stackoverflow.com/questions/39760854/append-dynamic-li-from-an-array
        // for each item in there
        for ( var i = 0; i <= showRecentSearches.length; i++);
        //append it to the recent search list item
        $(".list-searches").append("<li></li>").text(showRecentSearches[i]);
    }
}


// For this project, I need to have a search bar that the user can input the city name into. 


$("#search-submit").on("click", async function (event){
    event.preventDefault()
    console.log("am I running?")
    
    //create a variable for the user input
    var city = $("#search-entry").val();
    console.log(city)

    // URL to geocoding by location name
    var geoLocationURL = "http://api.openweathermap.org/geo/1.0/direct?q="+ city +"&limit=1&appid=" + appid

    // // the user information will then need to go through the geocoding API in order to get lagitude and longitude.
    // //So, I then created the new URL
    // var newLocationURL = geoLocationURL + appid
    console.log(geoLocationURL)
    
    fetch(geoLocationURL)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        //move page to other index page?

    
    // Here I created a function to push the user input into the recent searches
    function pushRecents(){
        var recentSearches = []
        recentSearches.push(city);
        console.log(recentSearches)
        //which will also need to be saved to local storage.
        localStorage.setItem("cities", JSON.stringify(recentSearches));
    }
    //I also called that function
    pushRecents()
    showSearchHistory();
})


//once we have received the lagitude and longitude, we can then pull the oneCall API for the weather information.
//With that weather information we will need to append it to our HTML file.
