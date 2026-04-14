document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initThemeToggle();
  initWeatherAPI();
  initQuoteAPI();
  initContactForm();
});

function initScrollProgress() {
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progress.style.width = scrollPercent + '%';
  });
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}

function initThemeToggle() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);

  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      showToast(`Switched to ${newTheme} mode`, 'success');
    });
  }
}

async function initWeatherAPI() {
  const weatherContent = document.getElementById('weatherContent');
  const cityInput = document.getElementById('cityInput');
  
  if (cityInput) {
    cityInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') fetchWeather();
    });
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByLocation(position.coords.latitude, position.coords.longitude);
      },
      () => {
        fetchWeatherByLocation(10.3157, 124.9455);
      }
    );
  } else {
    fetchWeatherByLocation(10.3157, 124.9455);
  }
}

async function fetchWeather() {
  const city = document.getElementById('cityInput')?.value.trim();
  const weatherContent = document.getElementById('weatherContent');
  if (!weatherContent) return;

  if (!city) {
    weatherContent.innerHTML = '<p class="text-muted">Please enter a city name</p>';
    return;
  }

  weatherContent.innerHTML = '<div class="loading-spinner"></div>';

  try {
    const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
    if (!response.ok) throw new Error('Weather not found');
    const data = await response.json();
    const current = data.current_condition[0];
    const nearestArea = data.nearest_area ? data.nearest_area[0] : null;
    const locationName = nearestArea ? nearestArea.areaName[0].value : city;
    
    const weatherIcons = {
      'Clear': '☀️',
      'Sunny': '☀️',
      'Cloudy': '☁️',
      'Overcast': '🌥️',
      'Partly cloudy': '⛅',
      'Rain': '🌧️',
      'Light rain': '🌦️',
      'Snow': '❄️',
      'Thunderstorm': '⛈️',
      'Fog': '🌫️'
    };
    const icon = weatherIcons[current.weatherDesc[0].value] || '🌤️';
    
    weatherContent.innerHTML = `
      <div class="weather-result">
        <div class="weather-icon">${icon}</div>
        <div class="weather-temp">${current.temp_C}°C</div>
        <div class="weather-desc">${current.weatherDesc[0].value}</div>
        <div class="weather-details">
          <span>💧 ${current.humidity}%</span>
          <span>💨 ${current.windspeedKmph} km/h</span>
        </div>
        <p class="text-muted mt-2">📍 ${locationName}</p>
      </div>
    `;
    showToast('Weather updated!', 'success');
  } catch (error) {
    weatherContent.innerHTML = '<p class="text-muted">City not found. Try another.</p>';
    showToast('City not found', 'error');
  }
}

async function fetchWeatherByLocation(lat, lon) {
  const weatherContent = document.getElementById('weatherContent');
  if (!weatherContent) return;

  weatherContent.innerHTML = '<div class="loading-spinner"></div>';

  try {
    const response = await fetch(`https://wttr.in/${lat},${lon}?format=j1`);
    if (!response.ok) throw new Error('Weather not found');
    const data = await response.json();
    const current = data.current_condition[0];
    const nearestArea = data.nearest_area ? data.nearest_area[0] : null;
    const locationName = nearestArea ? nearestArea.areaName[0].value : nearestArea ? nearestArea.country[0].value : 'Unknown Location';
    
    const weatherIcons = {
      'Clear': '☀️',
      'Sunny': '☀️',
      'Cloudy': '☁️',
      'Overcast': '🌥️',
      'Partly cloudy': '⛅',
      'Rain': '🌧️',
      'Light rain': '🌦️',
      'Snow': '❄️',
      'Thunderstorm': '⛈️',
      'Fog': '🌫️'
    };
    const icon = weatherIcons[current.weatherDesc[0].value] || '🌤️';
    
    weatherContent.innerHTML = `
      <div class="weather-result">
        <div class="weather-icon">${icon}</div>
        <div class="weather-temp">${current.temp_C}°C</div>
        <div class="weather-desc">${current.weatherDesc[0].value}</div>
        <div class="weather-details">
          <span>💧 ${current.humidity}%</span>
          <span>💨 ${current.windspeedKmph} km/h</span>
        </div>
        <p class="text-muted mt-2">📍 ${locationName}</p>
      </div>
    `;
  } catch (error) {
    weatherContent.innerHTML = '<p class="text-muted">Unable to load weather</p>';
  }
}

async function fetchWeatherByGPS() {
  const weatherContent = document.getElementById('weatherContent');
  if (!weatherContent) return;

  weatherContent.innerHTML = '<div class="loading-spinner"></div>';

  if (!navigator.geolocation) {
    weatherContent.innerHTML = '<p class="text-muted">Geolocation not supported</p>';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      fetchWeatherByLocation(position.coords.latitude, position.coords.longitude);
      showToast('Location detected!', 'success');
    },
    (error) => {
      fetchWeatherByLocation(10.3157, 124.9455);
      showToast('Using default location', 'error');
    }
  );
}

async function initQuoteAPI() {
  fetchQuote();
}

async function fetchQuote() {
  const container = document.getElementById('quoteContainer');
  const refreshBtn = document.querySelector('.refresh-btn');
  
  if (refreshBtn) {
    refreshBtn.classList.add('spin');
    setTimeout(() => refreshBtn.classList.remove('spin'), 500);
  }
  
  if (!container) return;

  container.innerHTML = '<div class="loading-spinner"></div>';

  try {
    const response = await fetch('https://zenquotes.io/api/random');
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();

    container.innerHTML = `
      <div class="quote-card-content">
        <p class="quote-text">"${data[0].q}"</p>
        <p class="quote-author">— ${data[0].a}</p>
      </div>
    `;
  } catch (error) {
    const fallbackQuotes = [
      { q: "The only way to do great work is to love what you do.", a: "Steve Jobs" },
      { q: "Innovation distinguishes between a leader and a follower.", a: "Steve Jobs" },
      { q: "Stay hungry, stay foolish.", a: "Steve Jobs" },
      { q: "The future belongs to those who believe in the beauty of their dreams.", a: "Eleanor Roosevelt" },
      { q: "It is during our darkest moments that we must focus to see the light.", a: "Aristotle" }
    ];
    const random = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    container.innerHTML = `
      <div class="quote-card-content">
        <p class="quote-text">"${random.q}"</p>
        <p class="quote-author">— ${random.a}</p>
      </div>
    `;
  }
}

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  const modalForm = document.getElementById('modalForm');
  if (modalForm) {
    modalForm.addEventListener('submit', handleModalSubmit);
  }
}

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const message = document.getElementById('message')?.value.trim();
  
  if (name && email && message) {
    showToast('Message sent successfully!', 'success');
    e.target.reset();
  } else {
    showToast('Please fill in all required fields', 'error');
  }
}

function handleModalSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('modalName')?.value.trim();
  const email = document.getElementById('modalEmail')?.value.trim();
  const service = document.getElementById('modalService')?.value;

  if (name && email) {
    showToast(`Welcome ${name}! We'll contact you soon.`, 'success');
    closeModal();
    document.getElementById('modalForm')?.reset();
  } else {
    showToast('Please fill in all required fields', 'error');
  }
}

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : '✗'}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function openModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.remove('active');
}

window.closeModal = closeModal;
window.openModal = openModal;
window.fetchWeather = fetchWeather;
window.fetchWeatherByGPS = fetchWeatherByGPS;
window.fetchQuote = fetchQuote;
window.scrollToSection = scrollToSection;
window.toggleTheme = function() {
  document.getElementById('themeToggle')?.click();
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

document.querySelector('.modal-overlay')?.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) closeModal();
});