var APIKey = "529d0fda063cc140a2b1932e2f58436f";
var showRecentSearches = [];
let latVariable
let lonVariable
let card = document.querySelectorAll(".card")


//Here I created a function to display the items set in local storage
// For this project, I need to have a search bar that the user can input the city name into. 
$("#search-submit").on("click", function findLocation(event) {
    event.preventDefault()
    var city = $("#search-entry").val();
    // URL to geocoding by location name
    var geoLocationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey

    //create a variable for the user input
    console.log(city)

    function displayRecents() {
        showRecentSearches.push(city)
        //which will also need to be saved to local storage.
        localStorage.setItem("cities", JSON.stringify(showRecentSearches));
        //with the user information, I will need to append that information into the recent search history 

    }

    displayRecents();
    showSearchHistory();

    // the user information will then need to go through the geocoding API in order to get lagitude and longitude.    
    fetch(geoLocationURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (result) {
            console.log(result)
            let resultArray = Object.values(result)
            latVariable = resultArray[0].lat
            lonVariable = resultArray[0].lon
            console.log(latVariable)
            console.log(lonVariable)
            weatherAPI()
        //now that we have the lat and lon variables, we can create a function that will run our weather API

        
        
        })

})

function weatherAPI(){

    let oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latVariable + "&lon=" + lonVariable + "&units=imperial&exclude=hourly,minutely&appid=" + APIKey

    console.log(oneCallURL)

    fetch(oneCallURL)
        .then(function(response){
        return response.json()
    })

    .then(function(result){
        console.log(result)
//given the results
        let weatherResults = result
        console.log(weatherResults)
        
        //I created a function to append the information to the cards dynamically
        function cardFront(){
            for( i=0; i <= card.length; i++)
            
            var eachDay = document.querySelectorAll(".card-title");
            eachDay.textContent = weatherResults.daily[i]

        }
        cardFront()
    })}


function showSearchHistory() {
    //if there are no searches in local storage
    if (showRecentSearches.length === 0) {
        //display text
        $(".list-searches").text("No recent searches. Click submit to get started!")
    } else {
        //if there are items in the storage
        //https://stackoverflow.com/questions/39760854/append-dynamic-li-from-an-array
        // for each item in there
        for (var i = 0; i < showRecentSearches.length; i++);
        $(".append-recent").append("<li></li>").text(localStorage.getItem("cities"))
    }
}



//once we have received the lagitude and longitude, we can then pull the oneCall API for the weather information.
//With that weather information we will need to append it to our HTML file.
