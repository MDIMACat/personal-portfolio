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

eval("var toggleButton = document.getElementsByClassName('toggle-button')[0];\nvar navbarLinks = document.getElementsByClassName('nav')[0];\nvar navLinks = navbarLinks.getElementsByTagName('a');\ntoggleButton.addEventListener('click', function () {\n  navbarLinks.classList.toggle('active');\n});\nfor (var i = 0; i < navLinks.length; i++) {\n  navLinks[i].addEventListener('click', function () {\n    navbarLinks.classList.remove('active');\n  });\n}\ndocument.addEventListener('DOMContentLoaded', function () {\n  var weatherApiUrl = \"https://api.open-meteo.com/v1/forecast?latitude=-28.783&longitude=32.0377&current=apparent_temperature&timezone=Africa%2FCairo\";\n  fetch(weatherApiUrl).then(function (response) {\n    return response.json();\n  }).then(function (data) {\n    var temp = data.current.apparent_temperature;\n    var tempElement = document.getElementById('temp');\n    if (tempElement) {\n      tempElement.innerHTML = temp + \"°C\";\n    }\n  })[\"catch\"](function (error) {\n    console.log(error);\n  });\n});\ndocument.addEventListener('DOMContentLoaded', function () {\n  var newsUrl = \"https://newsdata.io/api/1/latest?language=en&apikey=pub_50223ff1354b8802cf901dfce78fd4cc91feb\";\n  fetch(newsUrl).then(function (response) {\n    return response.json();\n  }).then(function (data) {\n    for (var _i = 0; _i < data.results.length; _i++) {\n      var title = data.results[_i].title;\n      var link = data.results[_i].link;\n      var newsLink = document.querySelector('.headline-content a');\n      if (newsLink) {\n        newsLink.href = link;\n        newsLink.innerHTML = data.results[_i].title;\n      }\n    }\n  });\n});\n\n//# sourceURL=webpack://personal-portfolio/./scripts/script.js?");

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