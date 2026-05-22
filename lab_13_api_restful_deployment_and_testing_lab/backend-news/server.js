const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

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

// Primary News API Route
app.get('/api/news/:country', async (req, res) => {
  const { country } = req.params;
  const apiKey = process.env.NEWS_API_KEY;

  if (!country || country.trim() === '') {
    return res.status(400).json({
      success: false,
      error: "Bad Request",
      message: "Country parameter is required and cannot be empty."
    });
  }

  // Basic validation for country code format (typically 2 letters)
  if (country.length !== 2) {
    return res.status(400).json({
      success: false,
      error: "Bad Request",
      message: "Invalid country code format. Expected a 2-character country code (e.g., 'us', 'gb', 'pk')."
    });
  }

  if (!apiKey || apiKey === 'your_mock_or_real_key_here') {
    return res.status(500).json({
      success: false,
      error: "Configuration Error",
      message: "News API key is not configured. Please set a valid NEWS_API_KEY in the .env file."
    });
  }

  try {
    const url = `https://newsapi.org/v2/top-headlines?country=${encodeURIComponent(country.toLowerCase())}&apiKey=${apiKey}`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'NodeExpressApp/1.0' // NewsAPI requires User-Agent header for requests outside browser
      }
    });

    const data = response.data;

    if (!data.articles || !Array.isArray(data.articles)) {
      return res.status(500).json({
        success: false,
        error: "Downstream Parsing Error",
        message: "No articles list found in downstream response."
      });
    }

    // Limit to exactly 5 articles and map fields precisely
    const filteredArticles = data.articles.slice(0, 5).map(article => ({
      newsTitle: article.title || 'No Title Available',
      sourceName: article.source && article.source.name ? article.source.name : 'Unknown Source',
      newsUrl: article.url || '',
      publicationDate: article.publishedAt || ''
    }));

    return res.status(200).json({
      success: true,
      totalResults: data.totalResults,
      count: filteredArticles.length,
      data: filteredArticles
    });
  } catch (error) {
    if (error.response) {
      // Downstream API error response (e.g., invalid API key, parameter syntax, etc.)
      const status = error.response.status;
      const message = error.response.data.message || "Error occurred in NewsAPI service.";
      return res.status(status).json({
        success: false,
        error: `Downstream API Error (${status})`,
        message: message
      });
    } else if (error.request) {
      // Downstream service unreachable
      return res.status(503).json({
        success: false,
        error: "Service Unavailable",
        message: "No response was received from the NewsAPI service. Please check your internet connection."
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
  console.log(`📰  News API Microservice running on Port ${PORT}`);
  console.log(`🔗 Welcome route: http://localhost:${PORT}/`);
  console.log(`🔗 Query route:   http://localhost:${PORT}/api/news/:country`);
  console.log(`=================================================`);
});
