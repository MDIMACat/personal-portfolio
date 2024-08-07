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

eval("var toggleButton = document.getElementsByClassName(\"toggle-button\")[0];\nvar navbarLinks = document.getElementsByClassName(\"nav\")[0];\nvar navLinks = navbarLinks.getElementsByTagName(\"a\");\ntoggleButton.addEventListener(\"click\", function () {\n  navbarLinks.classList.toggle(\"active\");\n});\nfunction getUserLocation() {\n  var options = {\n    enableHighAccuracy: true,\n    timeout: 10000\n  };\n  if (navigator.geolocation) {\n    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);\n  } else {\n    console.error(\"Geolocation  is not supported by   your browser.\");\n  }\n}\nvar successCallback = function successCallback(position) {\n  var latitude = position.coords.latitude;\n  var longitude = position.coords.longitude;\n  var weatherApiUrl = \"https://api.open-meteo.com/v1/forecast?latitude=\".concat(latitude, \"&longitude=\").concat(longitude, \"&current=apparent_temperature&timezone=Africa%2FCairo\");\n  fetch(weatherApiUrl).then(function (response) {\n    return response.json();\n  }).then(function (data) {\n    var temp = data.current.apparent_temperature;\n    var tempElement = document.getElementById(\"temp\");\n    if (tempElement) {\n      tempElement.innerHTML = temp + \"°C\";\n    }\n  })[\"catch\"](function (error) {\n    var tempElement = document.getElementById(\"temp\");\n    tempElement.innerHTML = \"No data available\";\n    console.error(\"Error fetching weather data:\", error);\n  });\n};\nvar errorCallback = function errorCallback(error) {\n  console.log(error);\n};\ngetUserLocation();\nvar newsUrl = \"https://newsdata.io/api/1/latest?language=en&apikey=pub_50223ff1354b8802cf901dfce78fd4cc91feb\";\nfetch(newsUrl).then(function (response) {\n  return response.json();\n}).then(function (data) {\n  for (var i = 0; i < data.results.length; i++) {\n    var title = data.results[i].title;\n    var link = data.results[i].link;\n    var newsLink = document.querySelector(\".headline-content a\");\n    if (newsLink) {\n      newsLink.href = link;\n      newsLink.innerHTML = data.results[i].title;\n    }\n  }\n})[\"catch\"](function (error) {\n  console.error(\"Error fetching news data:\", error);\n  // Handle news data fetching errors (e.g., display an error message)\n});\n\n//# sourceURL=webpack://personal-portfolio/./scripts/script.js?");

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