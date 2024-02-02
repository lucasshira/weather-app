const apiKey = "55b05574caec81b29eaaff5562b7c100";
const accessKey = "WC_OeqF4OlVD16mM9EqtZduIjg_KT7sOoXAzbpDGeo0";

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

const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data;
};

const showWeatherData = async(city) => {
    const data = await getWeatherData(city);
    cityElement.innerText = data.name;
    tempElement.innerHTML = parseInt(data.main.temp);
    descElement.innerHTML = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    humidityElement.innerHTML = `${data.main.humidity}%`;
    windElement.innerHTML = `${data.wind.speed}km/h`;
    weatherContainer.classList.remove("hide");
};

async function setBackground(city) {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${accessKey}`);
        const data = await response.json();
        const imageUrl = data.results[0].urls.regular;

        document.body.style.backgroundImage = `url('${imageUrl}')`;
    } catch(e) {
        console.log(e);
    }
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
    setBackground(city);
});

cityInput.addEventListener('keyup', (e) => {
    if(e.code === "Enter"){
        const city = e.target.value;
        showWeatherData(city);
        setBackground(city); 
    }
});