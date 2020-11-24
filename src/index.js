function formatDate(date) {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `${day} ${hour}:${minute} `;
}

let currentTime = document.querySelector("#current-time");
let now = new Date();
currentTime.innerHTML = formatDate(now);

function displayWeatherConditions(response) {
  document.querySelector(".current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("h3").innerHTML = response.data.name;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document
    .querySelector("#current-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#current-icon")
    .setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKeyWeather = "0e309f005b8c859d835c3b5eb9cf22ec";
  let units = "metric";
  let apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}&units=${units}`;
  axios.get(apiUrlWeather).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchEngine = document.querySelector("#city-search-engine");
searchEngine.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
