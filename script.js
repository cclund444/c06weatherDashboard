var submitBtn = document.querySelector("#submit");
var selectLocation = document.querySelector("#location-selecy");
var selectDays = document.querySelector("date-select");

var getLocation = function(location) {
    // add info and api method here 
}

var getWeather = function(data) {
    // add info and api method here--check java on project 1 for help
fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data.data[0].latitude + "&lon=" + data.data[0].longitude + "&units=imperial&appid=d3f5af43f561d831f34569cf6fef321f"); 
    .then(function(response) {
        return response.json();
    })
}

var input = document.querySelector("#weather")

var button = document.querySelector("#search")