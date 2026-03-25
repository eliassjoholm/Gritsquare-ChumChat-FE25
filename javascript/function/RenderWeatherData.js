import { getDataFromCity, getWeatherData } from "../function/api.js";

export const renderWeatherData = async () => {
    try {
        const data = await getDataFromCity();
        const lat = data[0].lat;
        const lon = data[0].lon;

        const weatherData = await getWeatherData(lon, lat);
        console.log(weatherData);

        const weatherContainer = document.querySelector("#weather-container");
        weatherContainer.classList.add("weather-data");
        const cityName = document.querySelector("#headerForWeather");
        cityName.textContent = `Today's weather in ${weatherData.name}`;
        const temperature = document.createElement("p");
        temperature.textContent = `Temperature: ${weatherData.main.temp} °C`;
        const weatherDescription = document.createElement("p");
        weatherDescription.textContent = `Weather: ${weatherData.weather[0].description}`;

        weatherContainer.append(cityName, temperature, weatherDescription);
    }
    catch (error) {
        console.error("Error rendering weather data:", error);
    }
}