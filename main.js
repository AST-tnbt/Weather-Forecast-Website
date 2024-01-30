const inputLocation = document.getElementById("inputLocation");
const currentWeather = document.getElementById("currentInformation");
const forecastWeather = document.getElementById("forecastInformation");

function getWeather(event) {
    event.preventDefault();
    console.log('getWeather() function called!');
    var location = inputLocation.value.trim();
    if (!location) {
        alert("Please enter your city!");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid={YOUR_API_KEY}`)
        .then ((response) => {
            if (!response.ok) throw new Error("Network response is not ok")
            return response.json();
        })
        .then ((data) => {
            displayCurrentWeather(data);
        })
        .catch ((error) => {
            console.error("Error: ", error);
            currentWeather.innerHTML = `<p>An error occurred while fetching the data<br>Please check your input and try again</p>`
        });
}

function displayCurrentWeather(data) {
    if (data.weather && data.main && data.sys) {
        currentWeather.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <h3>Weather: ${data.weather[0].main}</h3>
            <img class="weather-icon" src="./icons/${data.weather[0].icon}.png" alt="Weather icon">
            <p>Temperature: ${Math.round(data.main.temp - 273.15)}&#176C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${Math.round(data.wind.speed * 3.6)} km/h</p>
        `;
    } else {
        currentWeather.innerHTML = "<p>Weather information not available for this location.</p>";
    } 
}
