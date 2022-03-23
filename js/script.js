// declare global variables so that they can be called later.
var APIKey = "529d0fda063cc140a2b1932e2f58436f";
let latVariable
let lonVariable
var todayDate = moment().format("LL")
var todayTemp = $(".temperature1")
var todayHum = $(".humidity1")
var todayWind = $(".wind-speed1")
var uvIndex = $(".uvIdx")
let weatherData
var cards = $(".cards")
var variableLists = $(".variableLists")
var showRecentSearches = localStorage.getItem("cities")

//Set todays date
$(".setToday").text(todayDate)

//Created an event listener that will initialize our website
$("#search-submit").on("click", function(event) {
    event.preventDefault();

    //Took away the class of hide for our card deck so the user can now see it.
    $(".card-deck").removeClass("hide")
    var userCity = document.getElementById("input").value
    //here I created the geo location URL so that I could pull the users Lat and Lon Values
    var geoLocationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + userCity + "&limit=1&appid=" + APIKey

    $(".cityName").text(userCity)
    
    function pushRecents(){
    var recentSearches = []
    recentSearches.push(userCity);
    console.log(recentSearches)
    //which will also need to be saved to local storage.
    localStorage.setItem("cities", JSON.stringify(recentSearches));
}
    pushRecents()
    showSearchHistory();

    console.log(userCity)

    // Once I submited that fetch
    fetch(geoLocationURL)
        .then(function (response) {
            return response.json()
        })
        //I created a function to parse through the results
        .then(function (result) {
            console.log(result)
            let resultArray = Object.values(result)
            latVariable = resultArray[0].lat
            lonVariable = resultArray[0].lon
            console.log(latVariable)
            console.log(lonVariable)
            //Once we have our results, we can call our main function, Weather API
            weatherAPI()
        })
    })

function weatherAPI(){
    let oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latVariable + "&lon=" + lonVariable + "&units=imperial&exclude=hourly,minutely&appid=" + APIKey

    //When we create the fetch function for our main URL
    fetch(oneCallURL)
        .then(response => response.json())
        //we need to extrapulate the data
        .then(function(data){
            console.log(data);
            weatherData = data;
            //and set the functions that will display todays weather
            setToday();
            //And the Weather for the Next five days
            cardFront();

        })



}

//This function sets today's weather
function setToday(){
    
    todayTemp.text(`Temperature: ${weatherData.current.temp}`)
    todayHum.text(`Humidity: ${weatherData.current.humidity}`)
    todayWind.text(`Wind Speed: ${weatherData.current.wind_speed}`)
    uvIndex.text(`UV Index: ${weatherData.current.uvi}`)
    $("#weatherIcon1").append("<img src='http://openweathermap.org/img/wn/" + weatherData.current.weather[0].icon + "@2x.png' />");

}
// After some research, I decide to create each of the card elements dynamically

function cardFront(){  
    for(i=0; i<cards.length; i++){
        
        // gives us next 5 days
        let dayCard = moment().add(i, 'days').format('l');
        
        // Create a header tag
        
        let everydayTemp = weatherData.daily[i].temp.day
        
        let everydayWind = weatherData.daily[i].wind_speed
        
        let everydayHum = weatherData.daily[i].humidity
        
        let cardDate = document.createElement('h3');
        cardDate.classList.add('card-title', 'center');
        cardDate.textContent = dayCard;
        
        let listAppend = document.createElement('ul')

        let cardTemp = document.createElement('li')
        cardTemp.classList.add('center')
        cardTemp.textContent = everydayTemp

        $(".weatherIcon").append("<img src='http://openweathermap.org/img/wn/" + weatherData.daily[i].weather[0].icon + "@2x.png' />")

        let cardWind = document.createElement('li');
        cardWind.textContent = everydayWind

        let cardHum = document.createElement('li');
        cardHum.textContent = everydayHum

        console.log(everydayTemp)
        console.log(everydayWind)
        console.log(everydayHum)
        //Here is where I appended all of my data dynamically.
        
        cards[i].appendChild(cardDate);
        cardDate.appendChild(listAppend);
        listAppend.appendChild(cardTemp);
        cardTemp.appendChild(cardWind);
        cardWind.appendChild(cardHum);

    }
}

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
        $(".list-searches").append("<li>").text(showRecentSearches[i]);
    }
}

