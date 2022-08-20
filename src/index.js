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

function showTemp(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
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

showWeather("Limassol");

let citySeacrhElement = document.querySelector("#city-search");
citySeacrhElement.addEventListener("click", searchCity);
