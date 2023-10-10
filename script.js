const city = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const modeToggleBtn = document.getElementById("mode-toggle");

async function fetchWeather(city) {
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=1`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c84236ae89msh08087d4f3c83781p1e0c6ajsn61680587c937",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const result = await response.json();
      document.querySelector(".city").innerHTML = result.location.name;
      document.querySelector(".temp").innerHTML =
        Math.round(result.current.temp_c) + "°C";
      document.querySelector(".humidity").innerHTML =
        result.current.humidity + "%";
      document.querySelector(".wind").innerHTML =
        result.current.wind_kph + " km/h";

      if (
        result.current.condition.icon &&
        result.current.condition.icon.trim() !== ""
      ) {
        console.log(result.current.condition.icon);
        weatherIcon.src = result.current.condition.icon;
      } else {
        weatherIcon.src = "images/clear.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    console.error(error);
  }
}

searchBtn.addEventListener("click", () => {
  fetchWeather(city.value);
});

modeToggleBtn.addEventListener("click", () => {
  const body = document.body;
  const isDarkMode = body.classList.toggle("dark-mode");
  if (isDarkMode) {
    modeToggleBtn.style.backgroundColor = "rgba(40, 40, 40, 0.8)";
    modeToggleBtn.style.color = "#f8e07c";
  } else {
    modeToggleBtn.style.backgroundColor = " #b69305";
    modeToggleBtn.style.color = "#f8e07c";
  }
});
