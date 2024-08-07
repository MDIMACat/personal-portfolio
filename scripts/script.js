const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("nav")[0];
const navLinks = navbarLinks.getElementsByTagName("a");

toggleButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});

function getUserLocation() {
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options
    );
  } else {
    console.error("Geolocation  is not supported by   your browser.");
  }
}

const successCallback = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const geoCodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=23039d7c0b994540a44d07e2076f6e0a`;
  const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=apparent_temperature&timezone=Africa%2FCairo`;

  fetch(weatherApiUrl)
    .then((response) => response.json())
    .then((data) => {
      const temp = data.current.apparent_temperature;
      const tempElement = document.getElementById("temp");
      if (tempElement) {
        tempElement.innerHTML = temp + "°C";
      }
    })
    .catch((error) => {
      const tempElement = document.getElementById("temp");
      tempElement.innerHTML = "No data available";
       const locationElment = document.getElementById("location");
      locationElment.innerHTML = "No data available";
      console.error("Error fetching weather data:", error);
    });

  fetch(geoCodingUrl)
    .then((response) => response.json())
    .then((data) => {
      const city = data.results[0].components.city;

      const locationElment = document.getElementById("location");
      locationElment.innerHTML = city;
      const country = data.results[0].components.country_code;
      const newsUrl = `https://newsdata.io/api/1/latest?country=${country}&language=en&apikey=pub_50223ff1354b8802cf901dfce78fd4cc91feb`;

      fetch(newsUrl)
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.results.length; i++) {
            const title = data.results[i].title;
            const link = data.results[i].link;
            const newsLink = document.querySelector(".headline-content a");

            if (newsLink) {
              newsLink.href = link;
              newsLink.innerHTML = data.results[i].title;
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching news data:", error);
        });
    });
};

const errorCallback = (error) => {
  const tempElement = document.getElementById("temp");
  tempElement.innerHTML = "No data available";
   const locationElment = document.getElementById("location");
    locationElment.innerHTML = "No data available";
  console.error("Error fetching weather data:", error);
};

getUserLocation();
