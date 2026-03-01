var apiKey = "f0bc5b3e8e1df6b5a9e916681396fc96";
var openWeatherApi = "https://api.openweathermap.org/data/2.5/weather";

var form = document.querySelector("#weather-app form");
var input = document.getElementById("weather-search");
var weatherSection = document.getElementById("weather");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    var userQuery = input.value.trim();
    weatherSection.innerHTML = "";
    input.value = "";

    if (!userQuery) return;

    try {
    var response = await fetch(
      openWeatherApi + "?units=imperial&appid=" + apiKey + "&q=" + userQuery
    );

    var data = await response.json();

    if (!response.ok || data.cod === "404") {
      weatherSection.innerHTML = "<h2>Location not found</h2>";
      return;
    }

    var timeString = new Date(data.dt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    weatherSection.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <a href="https://www.google.com/maps/search/?api=1&query=${data.coord.lat},${data.coord.lon}" target="__BLANK">
        Click to view map
      </a>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
      <p style="text-transform: capitalize;">
        ${data.weather[0].description}
      </p>
      <br>
      <p>Current: ${data.main.temp}° F</p>
      <p>Feels like: ${data.main.feels_like}° F</p>
      <br>
      <p>Last updated: ${timeString}</p>
    `;
    } catch (error) {
    weatherSection.innerHTML = "<h2>Location not found</h2>";
    }
});