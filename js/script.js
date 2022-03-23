var APIKey = "529d0fda063cc140a2b1932e2f58436f";
let latVariable
let lonVariable
var todayDate = moment().format("LL")
var todayTemp = $(".temperature1")
var todayHum = $(".humidity1")
var todayWind = $(".wind-speed1")
var uvIndex = $(".uvIdx")
let weatherData
var cardTemp = $(".temperature")
var cardHum = $(".humidity")
var cardWind = $(".wind-speed")


$(".setToday").text(todayDate)


$("#search-submit").on("click", function(event) {
    event.preventDefault();

    $("#allCards").removeClass("hide")
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
            setCards();

        })



}


function setToday(){
    
    todayTemp.text(`Temperature: ${weatherData.current.temp}`)
    todayHum.text(`Humidity: ${weatherData.current.humidity}`)
    todayWind.text(`Wind Speed: ${weatherData.current.wind_speed}`)
    uvIndex.text(`UV Index: ${weatherData.current.uvi}`)
    $("#weatherIcon1").append("<img id='theImg' src='http://openweathermap.org/img/wn/" + weatherData.current.weather[0].icon + "@2x.png' />");

}

function setCards(){
     for( var i=1; i<6; i++){

        var dayCard = moment().add(i, 'days').format('l');  //gives us next 5 days
        console.log(dayCard)

        $(".card-title").textContent = dayCard

    }
}