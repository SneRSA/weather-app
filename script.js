import React, { useState } from 'react';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = 'fafc1d942dcd656de778e9fdd8556f9e';

  const getWeather = () => {
    const cityDropdown = document.getElementById('city-dropdown');
    const city = cityDropdown.value; // Get selected city from the dropdown

    if (!city) {
      alert('Please select a city');
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.cod === '404') {
          alert('City not found');
        } else {
          setWeatherData(data);
        }
      })
      .catch((error) => {
        console.error(error);
        alert(error.message.includes('401') ? 'Unauthorized: Check your API key.' : 'Error fetching weather data.');
      });
  };

  return (
    <div>
      <select id="city-dropdown">
        <option value="Johannesburg">Johannesburg</option>
        <option value="Port Elizabeth">Port Elizabeth</option>
        <option value="Limpopo">Limpopo</option>
        <option value="Free State">Free State</option>
        <option value="Bloemfontein">Bloemfontein</option>
        <option value="Cape Town">Cape Town</option>
        <option value="Durban">Durban</option>
      </select>
      <button onClick={getWeather}>Get Weather</button>

      {weatherData && (
        <div id="weather-info">
          <h3>Weather in {weatherData.name}, {weatherData.sys.country}</h3>
          <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
          <p><strong>Condition:</strong> {weatherData.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
