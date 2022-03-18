var APIKey = "529d0fda063cc140a2b1932e2f58436f";
var showRecentSearches = JSON.parse(localStorage.getItems("cities"))

//Here I created a function to display the items set in local storage
function showSearchHistory(){
    //if there are no searches in local storage
    if( showRecentSearches.length === 0 ){
        //display text
        $(".list-searches").text("No recent searches. Click submit to get started!")
    }else{
        //if there are items in the storage
        //https://stackoverflow.com/questions/39760854/append-dynamic-li-from-an-array
        // for each item in there
        for ( var i = 0; i <= showRecentSearches.length; i++);
        //append it to the recent search list item
        $(".list-searches").append(<li></li>).text(showRecentSearches[i]);
    }
}
//Call the function so that the user can see it as soon as the page loads
showSearchHistory();
// For this project, I need to have a search bar that the user can input the city name into. 
$("#search-submit").on("click", function findLocation(){
    
    // URL to geocoding by location name
    var locationNameURL = "http://api.openweathermap.org/geo/1.0/direct?q={city-name},{state-code},{country-code}&limit=5&appid={API-key}";
    
    //create a variable for the user input
    var userInput = $("#search-entry").val();
    
    
    // Here I created a function to push the user input into the recent searches
    function pushRecents(){
        var recentSearches = []
        userInput.push(recentSearches);
        //which will also need to be saved to local storage.
        localStorage.setItem("cities", JSON.stringify(recentSearches));
        //with the user information, I will need to append that information into the recent search history 
    }
    pushRecents()


})

// the user information will then need to go through the geocoding API in order to get lagitude and longitude.
//once we have received the lagitude and longitude, we can then pull the oneCall API for the weather information.
//With that weather information we will need to append it to our HTML file.
