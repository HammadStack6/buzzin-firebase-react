import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const baseUrl = "http://api.weatherapi.com/v1";
        const apiKey = "5e4806a80d2541a0b6f115425250704"; // Your API key

        const response = await axios.get(`${baseUrl}/current.json`, {
          params: {
            key: apiKey,
            q: "Karachi", // Static city
          },
        });

        setWeather(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    fetchWeather();
  }, []); // Only once when the component mounts

  return (
    <div className="home-container">
      <div className="container">
        <h1>Welcome to Home Page!</h1>
        <p>You need to login to use the chat option.</p>

        {/* Display loading, error, or weather info */}
        {loading && <p className="loading-message">Loading weather data...</p>}
        {error && <p className="error-message">{error}</p>}

        {weather && (
          <div className="weather-card">
            <h2>Weather in {weather.location.name}</h2>
            <h4>
              {weather.location.region}, {weather.location.country}
            </h4>
            <img
              src={`http:${weather.current.condition.icon}`}
              alt={weather.current.condition.text}
            />
            <p>
              <strong>Temperature:</strong> {weather.current.temp_c}°C
            </p>
            <p>
              <strong>Condition:</strong> {weather.current.condition.text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
