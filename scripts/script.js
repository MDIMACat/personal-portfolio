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

async function getLocation() {
    const response = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=0a4cfd6135dc47739b4d7bae8ea14a5a");
    const data = await response.json();
    return {
        latitude: data.latitude,
        longitude: data.longitude
    };
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const { latitude, longitude } = await getLocation();
        const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=apparent_temperature&timezone=Africa%2FCairo`;
        const response = await fetch(weatherApiUrl);
        const data = await response.json();
        
        const temp = data.current.apparent_temperature;
        const tempElement = document.getElementById('temp');
        if (tempElement) {
            tempElement.innerHTML = temp + "°C";
        }
    } catch (error) {
        console.log('Error fetching weather data:', error);
    }

    try {
        const newsUrl = "https://newsdata.io/api/1/latest?language=en&apikey=pub_50223ff1354b8802cf901dfce78fd4cc91feb";
        const response = await fetch(newsUrl);
        const data = await response.json();

        for (let i = 0; i < data.results.length; i++) {
            const title = data.results[i].title;
            const link = data.results[i].link;
            const newsLink = document.querySelector('.headline-content a');

            if (newsLink) {
                newsLink.href = link;
                newsLink.innerHTML = data.results[i].title;
            }
        }
    } catch (error) {
        console.log('Error fetching news data:', error);
    }
});
