/// Display current time and hour

//Get current time
function getCurrentDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

//Display current date
let dateElement = document.querySelector("#current-date");
let currentDate = new Date();
dateElement.innerHTML = getCurrentDate(currentDate);

//Hours
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
/// Display City name and Weather Conditions with input and when searching

function displayCityNameandWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature-number").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#feels-like").innerHTML =
    response.data.main.feels_like;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
//Display Forecast for the next hours
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
  forecastElement.innerHTML = `
  <div class="col-2" >
      <h3>
      </h3>
      <img 
      src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png}"
      />
      <div class = "col-2" class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
      </div>
`;
}
function getCityInfo(city) {
  let apiKeyCity = "98d4b83d6a6df781e514f7015a1ca27d";
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyCity}&units=metric`;
  axios.get(apiUrlCity).then(displayCityNameandWeather);
  apiUrlCity = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKeyCity}&units=metric`;
  axios.get(apiUrlCity).then(displayForecast);
}
function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  getCityInfo(city);
}

//Submit Button
let formSubmit = document.querySelector("#search-city");
formSubmit.addEventListener("submit", handleSearch);

/// Get current Location

function searchLocation(position) {
  let apiKey = "98d4b83d6a6df781e514f7015a1ca27d";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityNameandWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//Current Location Button
let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocation);

//On load Temperature
let celsiusTemperature = null;

/// Converting Temperature to Fahrenheit
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-number");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  //Remove the active class from the celsius link - it only shows the other temperature as a link and not both at the same time
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

/// Converting Temperature back to Celsius
function displayCelsiustTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature-number");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

//Click to Convert to fahrenheit
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

//Click to Convert back to celsius
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiustTemperature);

//On load
getCityInfo("Lisbon");
