var searchFormEl = document.querySelector("#search-form");
var cityName = document.querySelector("#search-city");

var userSubmitBtn = document.querySelector("#search-btn");
var searchedCityName = document.querySelector("#searched-city-name");

var cityTemp = document.querySelector("#city-temp");
var cityWind = document.querySelector("city-wind");

var pWind = document.createElement("p");
var pHumidity = document.createElement("p");
var pUv = document.createElement("p");

var currentDate = moment().format('L');
var fiveDays = document.getElementById("display-5-days");

var storedCities = [];

var weatherIcon = document.createElement("img");


if (localStorage.getItem("searchHistory")) {
    storedCities = JSON.parse(localStorage.getItem("searchHistory"))
};



var clickSubmitEl = function(event) {
    event.preventDefault();
    
    var inputEl = cityName.value.trim();

    if (inputEl) {
        getWeatherForecast(inputEl);
        cityName.value = '';
    } else {
        alert("please enter a valid city.");
    }
};



var getWeatherForecast = function(search) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&units=imperial&appid=d3f5af43f561d831f34569cf6fef321f";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displaySearch(data, search)
                    getWeatherUvi(data.coord);
                
                    storedCities.push(data.name);
                    console.log(storedCities);
                    localStorage.setItem("searchHistory", JSON.stringify(storedCities.reverse()));
                    console.log(localStorage.getItem("searchHistory"));

                })
            }  
        });
};


var getWeatherUvi = function(data) {
    var {lat} = data;
    var {lon} = data;
    var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=d3f5af43f561d831f34569cf6fef321f";
    console.log(data);
    fetch(apiUrl2)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displaySearch2(data);   
                })
            }
        })  
}


var displaySearch = function(data, searchedCity) {
    searchedCityName.textContent = searchedCity + " " + currentDate;

    cityTemp.textContent = "Temp: " + data.main.temp;

    pWind.textContent = "Wind speed: " + data.wind.speed + " MPH";
    cityTemp.appendChild(pWind);

    pHumidity.textContent = "Humidity: " + data.main.humidity;
    pWind.appendChild(pHumidity);  
};



var displaySearch2 = function(data) {

    pUv.textContent = "UV Index: " + data.current.uvi;
    pWind.appendChild(pUv);

    fiveDays.innerHTML = '';

    for (var i = 1; i < 6; i++) {

        var nextDayDiv = document.createElement("div");
        nextDayDiv.classList = "col-2 border five-days"
        fiveDays.appendChild(nextDayDiv);

        var nextDayEl = document.createElement("p");
        var nextDayTemp = document.createElement("p");
        var nextDayWind = document.createElement("p");
        var nextDayHumidity = document.createElement("P");
        var nextDateMoment = moment.unix(data.daily[i].dt).format("L");

        nextDayEl.textContent = nextDateMoment;
        nextDayDiv.appendChild(nextDayEl);
        nextDayEl.classList = "five-day-el";
    
        nextDayTemp.textContent = "Temp: " + data.daily[i].temp.day;
        nextDayDiv.appendChild(nextDayTemp);

        nextDayWind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
        nextDayDiv.appendChild(nextDayWind);

        nextDayHumidity.textContent = "Humidity: " + data.daily[i].humidity;
        nextDayDiv.appendChild(nextDayHumidity);
        nextDayHumidity.classList = "humid-margin";

        getSavedCities();


        var icon = data.current.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        
        weatherIcon.setAttribute('src', iconUrl);

        $('#weather-icon').append(weatherIcon);
        
    }
}



var getSavedCities = function() {

    var searchHistoryDiv = document.getElementById("search-history");
    searchHistoryDiv.innerHTML = '';
    if (localStorage.getItem("searchHistory") !== null) {
        var cities = JSON.parse(localStorage.getItem("searchHistory"));

        for (i = 0; i < cities.length; i++) {
            var storedCity = document.createElement("button");
            storedCity.classList = "history-buttons";
            
            storedCity.textContent = cities[i];
            searchHistoryDiv.appendChild(storedCity);
        }
    } 
};



getSavedCities();



var fiveDayForecast = function(data) {
    console.log(data.current.temp);
    fiveDayForecast();
};





searchFormEl.addEventListener("submit", clickSubmitEl);