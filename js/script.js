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


$(".setToday").text(todayDate)


$("#search-submit").on("click", function(event) {
    event.preventDefault();

    $(".card-deck").removeClass("hide")
    var userCity = document.getElementById("input").value
    var geoLocationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + userCity + "&limit=1&appid=" + APIKey

    $(".cityName").text(userCity)

    console.log(userCity)

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
        })
    })

function weatherAPI(){
    let oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latVariable + "&lon=" + lonVariable + "&units=imperial&exclude=hourly,minutely&appid=" + APIKey

    fetch(oneCallURL)
        .then(response => response.json())
        .then(function(data){
            console.log(data);
            weatherData = data;
            setToday();
            cardFront();

        })



}


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
        
        
        let everydayIcon = weatherData.daily[i].weather[0].icon
        
        let everydayWind = weatherData.daily[i].wind_speed
        
        let everydayHum = weatherData.daily[i].humidity
        
        let cardDate = document.createElement('h3');
        cardDate.classList.add('card-title', 'center');
        cardDate.textContent = dayCard;
        
        let listAppend = document.createElement('ul')

        let cardTemp = document.createElement('li')
        cardTemp.classList.add('center')
        cardTemp.textContent = everydayTemp

        let cardIcon = document.createElement('div');
        cardIcon.classList.add('center')
        cardIcon.append("<img src='http://openweathermap.org/img/wn/" + cardIcon + "@2x.png' />");

        let cardWind = document.createElement('li');
        cardWind.textContent = everydayWind

        let cardHum = document.createElement('li');
        cardHum.textContent = everydayHum

        console.log(everydayTemp)
        console.log(everydayIcon)
        console.log(everydayWind)
        console.log(everydayHum)
        
        cards[i].appendChild(cardDate);
        cardDate.appendChild(listAppend);
        listAppend.appendChild(cardTemp)
        cardTemp.appendChild()
        //variableLists.appendChild(dailyTempHigh, dailyTempLow)
    }
}