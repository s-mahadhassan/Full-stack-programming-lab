/* 
   =========================================
   Lab 13 API Hub: JavaScript Logic
   Developer: Mahad Hassan (RegID: 232053)
   =========================================
*/

const WEATHER_API_URL = 'http://localhost:5001';
const NEWS_API_URL = 'http://localhost:5002';

document.addEventListener('DOMContentLoaded', () => {
  // --- Run Diagnostics ---
  checkServiceStatuses();

  // --- Element Binding ---
  // Weather
  const weatherCityInput = document.getElementById('weather-city-input');
  const weatherSearchBtn = document.getElementById('weather-search-btn');
  const weatherLoader = document.getElementById('weather-loader');
  const weatherPlaceholder = document.getElementById('weather-placeholder');
  const weatherResults = document.getElementById('weather-results');
  const weatherError = document.getElementById('weather-error');

  const wCityTitle = document.getElementById('w-city-title');
  const wTemp = document.getElementById('w-temp');
  const wCondition = document.getElementById('w-condition');
  const wHumidity = document.getElementById('w-humidity');
  const wErrorTitle = document.getElementById('w-error-title');
  const wErrorMessage = document.getElementById('w-error-message');

  // News
  const newsCountrySelect = document.getElementById('news-country-select');
  const newsSearchBtn = document.getElementById('news-search-btn');
  const newsLoader = document.getElementById('news-loader');
  const newsPlaceholder = document.getElementById('news-placeholder');
  const newsResults = document.getElementById('news-results');
  const newsError = document.getElementById('news-error');

  const newsCount = document.getElementById('news-count');
  const newsListContainer = document.getElementById('news-list-container');
  const nErrorTitle = document.getElementById('n-error-title');
  const nErrorMessage = document.getElementById('n-error-message');

  // --- Event Listeners ---
  // Weather Search Trigger
  weatherSearchBtn.addEventListener('click', () => {
    const city = weatherCityInput.value.trim();
    if (city === '') return;
    fetchWeather(city);
  });

  weatherCityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const city = weatherCityInput.value.trim();
      if (city === '') return;
      fetchWeather(city);
    }
  });

  // News Search Trigger
  newsSearchBtn.addEventListener('click', () => {
    const country = newsCountrySelect.value;
    fetchNews(country);
  });

  // --- Core API Integration Functions ---

  // 🌤️ Fetch Weather Forecast
  async function fetchWeather(city) {
    // UI state: loading
    showScreen(weatherLoader);

    try {
      const response = await fetch(`${WEATHER_API_URL}/api/weather/${encodeURIComponent(city)}`);
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw {
          status: response.status,
          error: payload.error || 'API Error',
          message: payload.message || 'Downstream OpenWeather query failed.'
        };
      }

      // Populate UI
      const data = payload.data;
      wCityTitle.textContent = data.cityName;
      wTemp.textContent = Math.round(data.currentTemperature);
      wCondition.textContent = data.weatherCondition;
      wHumidity.textContent = `${data.humidityLevel}%`;

      showScreen(weatherResults);
    } catch (err) {
      console.error("Weather API Exception:", err);
      
      // Determine Error Text
      if (err.status) {
        wErrorTitle.textContent = `${err.error} (Status ${err.status})`;
        wErrorMessage.textContent = err.message;
      } else {
        wErrorTitle.textContent = "Service Unreachable";
        wErrorMessage.textContent = "Could not establish connection with backend Weather API on port 5001. Ensure the server script is running.";
      }
      
      showScreen(weatherError);
    }
  }

  // 📰 Fetch News Headlines
  async function fetchNews(country) {
    // UI state: loading
    showScreen(newsLoader);

    try {
      const response = await fetch(`${NEWS_API_URL}/api/news/${encodeURIComponent(country)}`);
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw {
          status: response.status,
          error: payload.error || 'API Error',
          message: payload.message || 'Downstream NewsAPI headlines query failed.'
        };
      }

      // Populate UI
      const articles = payload.data;
      newsCount.textContent = `${articles.length} Article${articles.length !== 1 ? 's' : ''}`;
      
      // Clear container and append
      newsListContainer.innerHTML = '';
      if (articles.length === 0) {
        newsListContainer.innerHTML = '<div class="placeholder-screen"><p>No headlines found for this country.</p></div>';
      } else {
        articles.forEach(article => {
          const card = document.createElement('div');
          card.className = 'news-card';

          const formattedDate = article.publicationDate 
            ? new Date(article.publicationDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) 
            : 'Unknown Date';

          card.innerHTML = `
            <a href="${article.newsUrl}" target="_blank" rel="noopener noreferrer" class="news-card-title">
              ${article.newsTitle}
            </a>
            <div class="news-card-footer">
              <span class="news-source"><i class="fa-solid fa-feather"></i> ${article.sourceName}</span>
              <span class="news-date"><i class="fa-regular fa-clock"></i> ${formattedDate}</span>
            </div>
          `;
          newsListContainer.appendChild(card);
        });
      }

      showScreen(newsResults);
    } catch (err) {
      console.error("News API Exception:", err);
      
      // Determine Error Text
      if (err.status) {
        nErrorTitle.textContent = `${err.error} (Status ${err.status})`;
        nErrorMessage.textContent = err.message;
      } else {
        nErrorTitle.textContent = "Service Unreachable";
        nErrorMessage.textContent = "Could not establish connection with backend News API on port 5002. Ensure the server script is running.";
      }

      showScreen(newsError);
    }
  }

  // Helper function to handle conditional visibility
  function showScreen(targetScreen) {
    const screens = [weatherLoader, weatherPlaceholder, weatherResults, weatherError];
    const newsScreens = [newsLoader, newsPlaceholder, newsResults, newsError];

    if (screens.includes(targetScreen)) {
      screens.forEach(s => s.classList.add('hidden'));
      targetScreen.classList.remove('hidden');
    } else if (newsScreens.includes(targetScreen)) {
      newsScreens.forEach(s => s.classList.add('hidden'));
      targetScreen.classList.remove('hidden');
    }
  }

  // --- Real-time Connection Diagnostics ---
  async function checkServiceStatuses() {
    // 🌤️ Weather Check
    const weatherDot = document.getElementById('weather-dot');
    const weatherMeta = document.getElementById('weather-meta');
    
    try {
      const startTime = performance.now();
      const res = await fetch(WEATHER_API_URL);
      const data = await res.json();
      const latency = Math.round(performance.now() - startTime);

      if (res.ok && data.developer) {
        weatherDot.className = 'pulse-dot online';
        weatherMeta.innerHTML = `<span style="color:var(--success)"><i class="fa-solid fa-wifi"></i> Online</span> (${latency}ms)`;
        
        // Dynamically sync developer information from active API metadata if available
        document.getElementById('dev-name').textContent = data.developer;
      } else {
        throw new Error("Invalid response");
      }
    } catch (e) {
      weatherDot.className = 'pulse-dot offline';
      weatherMeta.innerHTML = `<span style="color:var(--danger)"><i class="fa-solid fa-circle-xmark"></i> Offline</span>`;
    }

    // 📰 News Check
    const newsDot = document.getElementById('news-dot');
    const newsMeta = document.getElementById('news-meta');

    try {
      const startTime = performance.now();
      const res = await fetch(NEWS_API_URL);
      const data = await res.json();
      const latency = Math.round(performance.now() - startTime);

      if (res.ok && data.developer) {
        newsDot.className = 'pulse-dot online';
        newsMeta.innerHTML = `<span style="color:var(--success)"><i class="fa-solid fa-wifi"></i> Online</span> (${latency}ms)`;
      } else {
        throw new Error("Invalid response");
      }
    } catch (e) {
      newsDot.className = 'pulse-dot offline';
      newsMeta.innerHTML = `<span style="color:var(--danger)"><i class="fa-solid fa-circle-xmark"></i> Offline</span>`;
    }
  }
});
