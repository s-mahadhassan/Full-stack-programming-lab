const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Root welcome route returning personalized developer identity metadata
app.get('/', (req, res) => {
  res.status(200).json({
    developer: "Mahad Hassan",
    regId: "232053",
    section: "BSSE-6A",
    status: "Lab 13 API Core Online"
  });
});

// Primary Weather API Route
app.get('/api/weather/:city', async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city || city.trim() === '') {
    return res.status(400).json({
      success: false,
      error: "Bad Request",
      message: "City parameter is required and cannot be empty."
    });
  }

  if (!apiKey || apiKey === 'your_mock_or_real_key_here') {
    return res.status(500).json({
      success: false,
      error: "Configuration Error",
      message: "OpenWeather API key is not configured. Please set a valid OPENWEATHER_API_KEY in the .env file."
    });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;

    // Filter and map response payload exactly as requested
    const structuredResponse = {
      cityName: data.name,
      currentTemperature: data.main.temp,
      weatherCondition: data.weather[0] ? data.weather[0].description : 'unknown',
      humidityLevel: data.main.humidity
    };

    return res.status(200).json({
      success: true,
      data: structuredResponse
    });
  } catch (error) {
    if (error.response) {
      // Downstream API error response
      const status = error.response.status;
      const message = error.response.data.message || "Error occurred in OpenWeather service.";
      return res.status(status).json({
        success: false,
        error: `Downstream API Error (${status})`,
        message: message.charAt(0).toUpperCase() + message.slice(1)
      });
    } else if (error.request) {
      // Downstream service unreachable
      return res.status(503).json({
        success: false,
        error: "Service Unavailable",
        message: "No response was received from the OpenWeather service. Please check your internet connection."
      });
    } else {
      // Server-side parsing or structural failure
      return res.status(500).json({
        success: false,
        error: "Internal Server Error",
        message: error.message
      });
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🌤️  Weather API Microservice running on Port ${PORT}`);
  console.log(`🔗 Welcome route: http://localhost:${PORT}/`);
  console.log(`🔗 Query route:   http://localhost:${PORT}/api/weather/:city`);
  console.log(`=================================================`);
});
