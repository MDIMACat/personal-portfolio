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
      handleError("location", "Geolocation not supported by browser");
      handleError("temp", "Geolocation not supported by browser");
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
        if (data.results && data.results[0]) {
          const city = data.results[0].components.city || "Unknown location";
          const country = data.results[0].components.country_code || "Unknown country";

          updateElementContent("location", city);
          updateNewsData(country);
        } else {
          console.error("Invalid geocoding response:", data);
          handleError("location", "Location data not available");
        }
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
          if (latestNews) {
            newsLink.href = latestNews.link;
            newsLink.innerHTML = latestNews.title;
          } else {
            newsLink.innerHTML = "No news available";
          }
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
    if (error) {
      console.error(message, error);
    } else {
      console.error(message);
    }
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
