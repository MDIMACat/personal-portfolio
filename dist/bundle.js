/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/script.js":
/*!***************************!*\
  !*** ./scripts/script.js ***!
  \***************************/
/***/ (() => {

eval("document.addEventListener(\"DOMContentLoaded\", function () {\n  var toggleButton = document.getElementsByClassName(\"toggle-button\")[0];\n  var navbarLinks = document.getElementsByClassName(\"nav\")[0];\n  toggleButton.addEventListener(\"click\", function () {\n    navbarLinks.classList.toggle(\"active\");\n  });\n  var tokens = {\n    openCage: \"23039d7c0b994540a44d07e2076f6e0a\",\n    newsData: \"pub_50223ff1354b8802cf901dfce78fd4cc91feb\"\n  };\n  var urls = {\n    openCageUrl: \"https://api.opencagedata.com/geocode/v1/json\",\n    openMeteoUrl: \"https://api.open-meteo.com/v1/forecast\",\n    newsDataUrl: \"https://newsdata.io/api/1/latest\"\n  };\n  function getUserLocation() {\n    var options = {\n      enableHighAccuracy: true,\n      timeout: 10000\n    };\n    if (navigator.geolocation) {\n      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);\n    } else {\n      console.error(\"Geolocation is not supported by your browser.\");\n    }\n  }\n  function updateWeatherData(latitude, longitude) {\n    var weatherApiUrl = \"\".concat(urls.openMeteoUrl, \"?latitude=\").concat(latitude, \"&longitude=\").concat(longitude, \"&current=apparent_temperature&timezone=Africa%2FCairo\");\n    fetch(weatherApiUrl).then(function (response) {\n      return response.json();\n    }).then(function (data) {\n      var tempElement = document.getElementById(\"temp\");\n      if (tempElement) {\n        tempElement.innerHTML = data.current.apparent_temperature + \"°C\";\n      }\n    })[\"catch\"](function (error) {\n      return handleError(\"temp\", \"Error fetching weather data:\", error);\n    });\n  }\n  function updateLocationData(latitude, longitude) {\n    var geoCodingUrl = \"\".concat(urls.openCageUrl, \"?q=\").concat(latitude, \"%2C\").concat(longitude, \"&key=\").concat(tokens.openCage);\n    fetch(geoCodingUrl).then(function (response) {\n      return response.json();\n    }).then(function (data) {\n      var city = data.results[0].components.city;\n      var country = data.results[0].components.country_code;\n      updateElementContent(\"location\", city);\n      updateNewsData(country);\n    })[\"catch\"](function (error) {\n      return handleError(\"location\", \"Error fetching location data:\", error);\n    });\n  }\n  function updateNewsData(country) {\n    var newsUrl = \"\".concat(urls.newsDataUrl, \"?country=\").concat(country, \"&language=en&apikey=\").concat(tokens.newsData);\n    fetch(newsUrl).then(function (response) {\n      return response.json();\n    }).then(function (data) {\n      var newsLink = document.querySelector(\".headline-content a\");\n      if (newsLink) {\n        var latestNews = data.results[0];\n        newsLink.href = latestNews.link;\n        newsLink.innerHTML = latestNews.title;\n      }\n    })[\"catch\"](function (error) {\n      return console.error(\"Error fetching news data:\", error);\n    });\n  }\n  function updateElementContent(elementId, content) {\n    var element = document.getElementById(elementId);\n    if (element) {\n      element.innerHTML = content;\n    }\n  }\n  function handleError(elementId, message, error) {\n    updateElementContent(elementId, \"No data available\");\n    console.error(message, error);\n  }\n  var successCallback = function successCallback(position) {\n    var _position$coords = position.coords,\n      latitude = _position$coords.latitude,\n      longitude = _position$coords.longitude;\n    updateWeatherData(latitude, longitude);\n    updateLocationData(latitude, longitude);\n  };\n  var errorCallback = function errorCallback(error) {\n    handleError(\"temp\", \"Error fetching location data:\", error);\n    handleError(\"location\", \"Error fetching location data:\", error);\n  };\n  getUserLocation();\n});\n\n//# sourceURL=webpack://personal-portfolio/./scripts/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./scripts/script.js"]();
/******/ 	
/******/ })()
;