const apikey = "46f80a02ecae410460d59960ded6e1c6";
const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");
const darkModeCheckbox = document.getElementById("darkModeCheckbox");

  const darkModeIcon = document.getElementById("darkModeIcon");

  document.addEventListener("DOMContentLoaded", () => {
    const darkModeIcon = document.getElementById("darkModeIcon");
  
    // Check if dark mode preference is stored in localStorage
    const isDarkModePreferred = localStorage.getItem("darkMode") === "true";
  
    // Apply dark mode if preferred
    if (isDarkModePreferred) {
      document.body.classList.add("dark-mode");
      darkModeIcon.textContent = "🌙"; // Set icon for dark mode
    } else {
      document.body.classList.add("light-mode");
      darkModeIcon.textContent = "☀️"; // Set icon for light mode
    }
  
    darkModeIcon.addEventListener("click", () => {
      const isDarkMode = document.body.classList.toggle("dark-mode");
      darkModeIcon.textContent = isDarkMode ? "🌙" : "☀️";
  
      // Store the user's dark mode preference in localStorage
      localStorage.setItem("darkMode", isDarkMode);
    });
  
    // ... (other code)
  });
  

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInputEl.value;
  
  try {
    const data = await getWeatherData(city);
    updateWeatherUI(data);
  } catch (error) {
    handleWeatherError();
  }
});

async function getWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

function updateWeatherUI(data) {
  const temperature = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;
  const details = [
    `Feels like: ${Math.round(data.main.feels_like)}`,
    `Humidity: ${data.main.humidity}%`,
    `Wind speed: ${data.wind.speed} m/s`,
  ];

  weatherDataEl.querySelector(".icon").innerHTML = `<img src="lightrain.png" alt="Weather Icon">`;
  weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
  weatherDataEl.querySelector(".description").textContent = description;
  weatherDataEl.querySelector(".details").innerHTML = details
    .map((detail) => `<div>${detail}</div>`)
    .join("");
}

function handleWeatherError() {
  weatherDataEl.querySelector(".icon").innerHTML = "";
  weatherDataEl.querySelector(".temperature").textContent = "";
  weatherDataEl.querySelector(".description").textContent =
    "An error happened, please try again later";
  weatherDataEl.querySelector(".details").innerHTML = "";
}
