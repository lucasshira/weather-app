const API_URL = '__API_URL__';

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const humidityElement = document.querySelector('#humidity span');
const windElement = document.querySelector('#wind span');
const weatherContainer = document.querySelector('#weather-data');

const getWeatherData = async (city) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ city }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const showWeatherData = async (city) => {
    try {
        const data = await getWeatherData(city);

        if (data.error) {
            console.error('Error fetching weather data:', data.error);
            return { error: data.error };
        }

        cityElement.innerText = data.name;
        tempElement.innerHTML = parseInt(data.main.temp);
        descElement.innerHTML = data.weather[0].description;
        weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        humidityElement.innerHTML = `${data.main.humidity}%`;
        windElement.innerHTML = `${data.wind.speed}km/h`;
        weatherContainer.classList.remove("hide");

        return {
            name: data.name,
            temp: parseInt(data.main.temp),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: `${data.main.humidity}%`,
            windSpeed: `${data.wind.speed}km/h`,
            imageUrl: data.imageUrl,
        };
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
};

async function setBackground(imageUrl) {
    try {
        document.body.style.backgroundImage = `url('${imageUrl}')`;
    } catch (e) {
        console.log('Error:', e);
    }
}

searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const city = cityInput.value;

    try {
        const data = await showWeatherData(city);

        if (!data.error) {
            setBackground(data.imageUrl);
        }
    } catch (error) {
        console.error(error);
    }
});

cityInput.addEventListener('keyup', async (e) => {
    if (e.code === 'Enter') {
        const city = e.target.value;

        try {
            await showWeatherData(city);
        } catch (error) {
            console.error(error);
        }
    }
});