function showDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[new Date(timestamp).getDay()];
  let hours = new Date(timestamp).getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = new Date(timestamp).getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    `    <div class="col-2">
            <div class="card-forecast card-today">
              <div class="card-day today">Today</div>
              <img
                class="card-icon"
                src="http://openweathermap.org/img/wn/${
                  forecast[0].weather[0].icon
                }@2x.png"
                alt=""
              />
    <div class="temperature-container">
      <span class="card-max-temperature">${Math.round(
        forecast[0].temp.max
      )}° </span><span class="card-min-temperature">${Math.round(
      forecast[0].temp.min
    )}°</span></div>
            </div>
          </div>`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `    <div class="col-2">
            <div class="card-forecast">
              <div class="card-day">${formatDay(forecastDay.dt)}</div>
              <img
                class="card-icon"
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
              />
    <div class="temperature-container">
      <span class="card-max-temperature">${Math.round(
        forecastDay.temp.max
      )}° </span><span class="card-min-temperature">${Math.round(
          forecastDay.temp.min
        )}°</span></div>
            </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getCoordsForForecast(coordinates) {
  let apiKey = "3f8e63b0ac8703d0297945f6602e377d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  fahrenheitLink.classList.add("not-active");
  celciusLink.classList.remove("not-active");
  document.querySelector("#city-name").innerHTML = response.data.name;
  celciusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML =
    Math.round(celciusTemperature);
  celciusTemperatureRealFeel = response.data.main.feels_like;
  document.querySelector("#real-feel").innerHTML = Math.round(
    celciusTemperatureRealFeel
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#date").innerHTML = showDate(response.data.dt * 1000);
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getCoordsForForecast(response.data.coord);
}

function showWeather(city) {
  let apiKey = "3f8e63b0ac8703d0297945f6602e377d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  showWeather(cityInput.value);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let realFeelAElement = document.querySelector("#real-feel");
  fahrenheitLink.classList.remove("not-active");
  celciusLink.classList.add("not-active");
  temperatureElement.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
  realFeelAElement.innerHTML = Math.round(
    (celciusTemperatureRealFeel * 9) / 5 + 32
  );
}

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let realFeelAElement = document.querySelector("#real-feel");
  fahrenheitLink.classList.add("not-active");
  celciusLink.classList.remove("not-active");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  realFeelAElement.innerHTML = Math.round(celciusTemperatureRealFeel);
}

celciusTemperature = null;
celciusTemperatureRealFeel = null;

let citySeacrhElement = document.querySelector("#city-search");
citySeacrhElement.addEventListener("click", searchCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

showWeather("Limassol");
