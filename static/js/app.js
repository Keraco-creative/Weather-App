const apiUrl = '/get_weather';  
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

function updateWeather(data) {
    const temp = Math.floor(data.temperature);  
    const date = new Date(data.date * 1000);  
    const weatherHTML = `
        <div class="weather">
            <h2>
                <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="Weather Icon" />
                ${temp}°C
            </h2>
            <p><strong>City:</strong> ${data.city}</p>
            <p><strong>Date:</strong> ${date.toLocaleDateString()}</p>
            <p><strong>Weather:</strong> ${data.weather}</p>
            <p><strong>Humidity:</strong> ${data.humidity}%</p>
            <p><strong>Pressure:</strong> ${data.pressure} hPa</p>
            <p><strong>Wind Speed:</strong> ${data.wind_speed} m/s</p>
        </div>
    `;
    main.innerHTML = weatherHTML;
}


async function getWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?city=${city}`);
        const data = await response.json();

        if (data.error) {
            alert(data.error);
            return;
        }
        updateWeather(data);
    } catch (error) {
        alert('An error occurred while fetching the weather data.');
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value.trim();
    if (city) {
        getWeather(city);
    }
});
