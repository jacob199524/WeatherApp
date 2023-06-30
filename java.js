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
            document.getElementById("result").innerHTML = "Current temperature in " + city + " is " + data.main.temp + " Celsius";
        })
        .catch(error => {
            document.getElementById("result").innerHTML = "Error fetching weather data: " + error.message;
        });

    // reset the form
    document.getElementById("city").value = "";

    // prevent page from reloading
    return false;
}