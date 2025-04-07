import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, err);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function success(position) {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  }

  function err() {
    alert("Sorry, no position available.");
  }

  useEffect(() => {
    getLocation();
  }, []); // This will only run once when the component mounts.

  useEffect(() => {
    if (lat && long) {
      // Base URL and API key
      const baseUrl = "http://api.weatherapi.com/v1";
      const apiKey = "5e4806a80d2541a0b6f115425250704"; // Your actual API key

      // Fetch weather data
      axios
        .get(`${baseUrl}/current.json`, {
          params: {
            key: apiKey,
            q: `${lat},${long}`, // Use dynamic latitude and longitude
          },
        })
        .then((response) => {
          setWeather(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch weather data");
          setLoading(false);
        });
    }
  }, [lat, long]); // This will run when lat or long changes

  return (
    <div className="home-container">
      <div className="container">
        <h1>Welcome to Home Page!</h1>
        <p>You have successfully logged in or signed up.</p>

        {/* Display loading, error, or weather info */}
        {loading && <p className="loading-message">Loading weather data...</p>}
        {error && <p className="error-message">{error}</p>}

        {weather && (
          <div className="weather-card">
            <h2>Weather in {weather.location.name}</h2>
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
