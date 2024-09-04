import "./styles.css";

const form = document.querySelector("#city-form");
const input = document.querySelector("#city");

const cityName = document.querySelector(".city-name");
const icon = document.querySelector("#icon");
const weather = document.querySelector("#weather");
const weatherDesc = document.querySelector(".weather-desc");
const temp = document.querySelector(".temp");
const minTemp = document.querySelector(".min-temp");
const maxTemp = document.querySelector(".max-temp");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value;
  const weatherData = await fetchWeather(query);
  renderWeather(weatherData);
  form.reset();
});

async function fetchWeather(query) {
  const API_KEY = "485604aada29a5e34384a96d2154b6f6";
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return {
      name: data.name,
      mainWeather: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      temp: data.main.temp,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
    };
  } catch (error) {
    console.error("Error:", error);
  }
}

function renderWeather(data) {
  cityName.textContent = data.name;
  icon.src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
  weather.textContent = data.mainWeather;
  weatherDesc.textContent = data.description;
  temp.textContent = data.temp;
  minTemp.textContent = data.tempMin;
  maxTemp.textContent = data.tempMax;
}
