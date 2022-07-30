let now = new Date();
let date = now.getDate();
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
let hours = now.getHours();
let minutes = now.getMinutes();
let temperature;

let todayDate = document.querySelector("#day-time");
todayDate.innerHTML = `${day}, ${hours}:${minutes}`;

function showTemperature(response) {
  temperature = Math.round(response.data.main.temp);
  let message = `${temperature} °C`;
  let h3 = document.querySelector("#temperature");
  h3.innerHTML = message;
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  let h2 = document.querySelector("#current-city");
  h2.innerHTML = city.toUpperCase();
  let apiKey = "bb0d4750adbaf8dd371419162d9174d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(changeClouds);
  axios.get(apiUrl).then(changeWind);
  axios.get(apiUrl).then(changeHumidity);
}

function changeClouds(response) {
  console.log(response);
  let clouds = response.data.clouds.all;
  let cloudMessage = `${clouds}% Clouds`;
  let h4 = document.querySelector("#clouds-today");
  h4.innerHTML = cloudMessage;
}

function changeWind(response) {
  let wind = response.data.wind.speed;
  let windMessage = `Wind speed ${wind}`;
  let h4 = document.querySelector("#wind-speed");
  h4.innerHTML = windMessage;
}

function changeHumidity(response) {
  let humidity = response.data.main.humidity;
  let humidityMessage = `Humidity ${humidity}`;
  let h4 = document.querySelector("#humidity-today");
  h4.innerHTML = humidityMessage;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

function showPosition(position) {
  console.log(position.coords);
  let positionMessage = `Lat ${Math.round(
    position.coords.latitude
  )} Lon ${Math.round(position.coords.longitude)}`;
  let h2 = document.querySelector("#current-city");
  h2.innerHTML = positionMessage;
  let apiKey = "bb0d4750adbaf8dd371419162d9174d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(changeClouds);
  axios.get(apiUrl).then(changeWind);
  axios.get(apiUrl).then(changeHumidity);
}

function positionApiCall() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-position");
button.addEventListener("click", positionApiCall);
