document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementsByClassName("toggle-button")[0];
  const navbarLinks = document.getElementsByClassName("nav")[0];

  toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
  });

  const tokens = {
    openCage: "23039d7c0b994540a44d07e2076f6e0a",
    newsData: "pub_50223ff1354b8802cf901dfce78fd4cc91feb",
  };

  const urls = {
    openCageUrl: "https://api.opencagedata.com/geocode/v1/json",
    openMeteoUrl: "https://api.open-meteo.com/v1/forecast",
    newsDataUrl: "https://newsdata.io/api/1/latest",
  };

  function getUserLocation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  }

  function updateWeatherData(latitude, longitude) {
    const weatherApiUrl = `${urls.openMeteoUrl}?latitude=${latitude}&longitude=${longitude}&current=apparent_temperature&timezone=Africa%2FCairo`;

    fetch(weatherApiUrl)
      .then((response) => response.json())
      .then((data) => {
        const tempElement = document.getElementById("temp");
        if (tempElement) {
          tempElement.innerHTML = data.current.apparent_temperature + "°C";
        }
      })
      .catch((error) => handleError("temp", "Error fetching weather data:", error));
  }

  function updateLocationData(latitude, longitude) {
    const geoCodingUrl = `${urls.openCageUrl}?q=${latitude}%2C${longitude}&key=${tokens.openCage}`;

    fetch(geoCodingUrl)
      .then((response) => response.json())
      .then((data) => {
        const city = data.results[0].components.city;
        const country = data.results[0].components.country_code;

        updateElementContent("location", city);
        updateNewsData(country);
      })
      .catch((error) => handleError("location", "Error fetching location data:", error));
  }

  function updateNewsData(country) {
    const newsUrl = `${urls.newsDataUrl}?country=${country}&language=en&apikey=${tokens.newsData}`;

    fetch(newsUrl)
      .then((response) => response.json())
      .then((data) => {
        const newsLink = document.querySelector(".headline-content a");
        if (newsLink) {
          const latestNews = data.results[0];
          newsLink.href = latestNews.link;
          newsLink.innerHTML = latestNews.title;
        }
      })
      .catch((error) => console.error("Error fetching news data:", error));
  }

  function updateElementContent(elementId, content) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = content;
    }
  }

  function handleError(elementId, message, error) {
    updateElementContent(elementId, "No data available");
    console.error(message, error);
  }

  const successCallback = (position) => {
    const { latitude, longitude } = position.coords;

    updateWeatherData(latitude, longitude);
    updateLocationData(latitude, longitude);
  };

  const errorCallback = (error) => {
    handleError("temp", "Error fetching location data:", error);
    handleError("location", "Error fetching location data:", error);
  };

  getUserLocation();
});
