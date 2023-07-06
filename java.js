function getWeatherIcon(weatherCode) {
  // You can extend this function to include more weather conditions and corresponding icons
  switch (weatherCode) {
    case '01d':
    case '01n':
      return 'fa-sun';
    case '02d':
    case '02n':
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      return 'fa-cloud';
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      return 'fa-cloud-showers-heavy';
    case '11d':
    case '11n':
      return 'fa-bolt';
    case '13d':
    case '13n':
      return 'fa-snowflake';
    case '50d':
    case '50n':
      return 'fa-smog';
    default:
      return 'fa-question';
  }
}

function getWeather() {
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const apiKey = "31e931352393e4bc553f77d1819d7c08";
  const location = `${city},${state}`;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      const resultElement = document.getElementById("result");
      const temperatureCelsius = data.main.temp;
      const temperatureFahrenheit = (temperatureCelsius * 9 / 5) + 32;

      resultElement.innerHTML = `Temperature in ${city}, ${state} is ${temperatureFahrenheit.toFixed(2)}°F`;
      resultElement.style.display = "block";

      // Store the city name for forecast display
      document.getElementById("forecast-city").innerText = `24 hour forecast for ${city}, ${state}`;

      return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      const forecastElement = document.getElementById("forecast-cards");
      forecastElement.innerHTML = ""; // Clear any existing forecast cards

      const forecasts = data.list;
      const currentDate = new Date();
      const next24Hours = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));

      for (const forecast of forecasts) {
        const date = new Date(forecast.dt * 1000);
        const temperatureCelsius = forecast.main.temp;
        const temperatureFahrenheit = (temperatureCelsius * 9 / 5) + 32;
        const weatherIconCode = forecast.weather[0].icon;

        if (date >= currentDate && date <= next24Hours) {
          const forecastCard = document.createElement("div");
          forecastCard.classList.add("forecast-card");

          const iconElement = document.createElement("i");
          iconElement.classList.add('fas', getWeatherIcon(weatherIconCode));
          forecastCard.appendChild(iconElement);

          const dateElement = document.createElement("p");
          dateElement.innerHTML = date.toLocaleString();
          forecastCard.appendChild(dateElement);

          const temperatureElement = document.createElement("p");
          temperatureElement.innerHTML = `${temperatureFahrenheit.toFixed(2)}°F`;
          forecastCard.appendChild(temperatureElement);

          forecastElement.appendChild(forecastCard);
        }
      }
    })
    .catch(error => {
      const resultElement = document.getElementById("result");
      resultElement.innerHTML = "Error fetching weather data: " + error.message;
      resultElement.style.display = "block";
    });

  document.getElementById("city").value = "";
  document.getElementById("state").value = "";

  return false;
}