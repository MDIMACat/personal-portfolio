const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('nav')[0];
const navLinks = navbarLinks.getElementsByTagName('a');

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});

for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', () => {
        navbarLinks.classList.remove('active');
    });
    
}

document.addEventListener('DOMContentLoaded', function() {
    const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?latitude=-28.783&longitude=32.0377&current=apparent_temperature&timezone=Africa%2FCairo";

    fetch(weatherApiUrl)
    .then(response => response.json())
    .then(data => {
        const temp = data.current.apparent_temperature;
        const tempElement = document.getElementById('temp');
        if (tempElement) {
            tempElement.innerHTML = temp + "°C";
        }
    })
    .catch(error => {
        console.log(error);
    });

    
});

document.addEventListener('DOMContentLoaded', function() {
    const newsUrl = "https://newsdata.io/api/1/latest?language=en&apikey=pub_50223ff1354b8802cf901dfce78fd4cc91feb"

    fetch(newsUrl)
    .then(response => response.json())
    .then(data => {

        for (let i = 0; i < data.results.length; i++) {
            const title = data.results[i].title;
            const link = data.results[i].link;
            const newsLink = document.querySelector('.headline-content a');
    
            if (newsLink) {
                newsLink.href = link;
                newsLink.innerHTML = data.results[i].title;
            }
        }
    })  
});