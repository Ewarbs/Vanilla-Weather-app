function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

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

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
  console.log(forecast);

  forecastElement.innerHTML = ` <div class="col-3">
          <h3> ${formatHours(forecast.dt * 1000)} </h3>
          <img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" alt=""/>
          <div class="weather-forecast-temperature">
            <strong>${Math.round(
              forecast.main.temp_max
            )}° </strong> ${Math.round(forecast.main.temp_min)}°
      </div>
      </div>`;

  forecast = response.data.list[1];

  forecastElement.innerHTML =
    forecastElement.innerHTML +
    `
    <div class="col-3">
          <h3> ${formatHours(forecast.dt * 1000)} </h3>
          <img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" alt=""/>
          <div class="weather-forecast-temperature">
            <strong>${Math.round(
              forecast.main.temp_max
            )}° </strong> ${Math.round(forecast.main.temp_min)}°
      </div>
      </div>`;

  forecast = response.data.list[2];
  forecastElement.innerHTML += `
    <div class="col-3">
          <h3> ${formatHours(forecast.dt * 1000)} </h3>
          <img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" alt=""/>
          <div class="weather-forecast-temperature">
            <strong>${Math.round(
              forecast.main.temp_max
            )}° </strong> ${Math.round(forecast.main.temp_min)}°
      </div>
      </div>`;

  forecast = response.data.list[3];
  forecastElement.innerHTML += `
    <div class="col-3">
          <h3> ${formatHours(forecast.dt * 1000)} </h3>
          <img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" alt=""/>
          <div class="weather-forecast-temperature">
            <strong>${Math.round(
              forecast.main.temp_max
            )}° </strong> ${Math.round(forecast.main.temp_min)}°
      </div>
      </div>`;
}

function search(city) {
  let apiKey = "ce95360602ff5e38a7b8de4082604c06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#Celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
