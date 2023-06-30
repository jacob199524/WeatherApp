function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "31e931352393e4bc553f77d1819d7c08"; // Replace with your OpenWeatherMap API key
  
    // Make the API request using the Fetch API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
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
        resultElement.innerHTML = "Current temperature in " + city + " is " + temperatureFahrenheit.toFixed(2) + " Fahrenheit";
        resultElement.style.display = "block"; // Show the result element
      })
      .catch(error => {
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = "Error fetching weather data: " + error.message;
        resultElement.style.display = "block"; // Show the result element even if there's an error
      });
  
    // reset the form
    document.getElementById("city").value = "";
  
    // prevent page from reloading
    return false;
  }