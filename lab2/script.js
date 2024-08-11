const apiKey = 'c2d45d4153edf003e7d0fdb792ed522e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const weatherSearch = document.querySelector('#search');
const weatherInfo = document.querySelector('.weather-info');
const weatherSearchCity = document.querySelector('.weather-search-city');
const weatherSearchError = document.querySelector('.weather-search-error');
const weatherSummaryImg = document.querySelector('#weather-summary-img');
const weatherMain = document.querySelector('.main');
const weatherDate = document.querySelector('.weather-date');


// gọi api và show dữ liệu
async function fetchData(location= 'Hà Nội') {
    try {
        const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
        let response = await fetch(url);
        return await response.json();

    }catch (error){
        console.log(error)
        weatherInfo.style.display = 'none';
        weatherSearchCity.style.display = 'none';
        weatherSearchError.style.display = 'flex';
    }
}

window.onload = async function (){
    await updateWeatherData("Hà Nội");
}

const btn_search = document.getElementById('btn-search');

btn_search.addEventListener('click', async (e) => {
    e.preventDefault();

    await updateWeatherData(weatherSearch.value);
});

weatherSearch.addEventListener('keypress', async (e) => {
    if(e.keyCode === 13){
        await updateWeatherData(weatherSearch.value);
    }
});

// show data
async function updateWeatherData(value){
    const result = await fetchData(value);

    if (result.status !== 200) {
        weatherInfo.style.display = 'none';
        weatherSearchCity.style.display = 'flex';
        weatherSearchError.style.display = 'none';
    }

    const {
        name,
        main: {temp, humidity},
        sys: {
            country
        },
        wind: {speed},
        weather: [{id, main}]
    } = result;

    weatherInfo.style.display = 'flex';
    weatherSearchCity.style.display = 'none';
    weatherSearchError.style.display = 'none';

    document.querySelector('.country').innerText = `${name}, ${country}`;
    document.querySelector('.temp').innerHTML = `${temp} &#x2103`;
    document.querySelector('#speed').innerHTML = `${speed} M/s`;
    document.querySelector('#humidity').innerHTML = `${humidity} %`;

    weatherMain.innerText = main;
    weatherSummaryImg.src = `assets/weather/${getWeatherIcon(id)}`;

    weatherDate.innerText = getCurrentDate();
}

function getCurrentDate(){
    const currentDate = new Date();
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
    }

    return currentDate.toLocaleDateString("en-US", options);
}

function getWeatherIcon(id){
    let icon = "";
    switch(id){
        case id <= 232:{
            icon = 'thunderstorm.svg';
            break;
        }
        case id <= 321: {
            icon = 'drizzle.svg';
            break;
        }
        case id <= 531: {
            icon = 'rain.svg';
            break;
        }
        case id <= 622: {
            icon = 'snow.svg';
            break;
        }
        case id <= 781:{
            icon = 'atmosphere.svg';
            break;
        }
        case id <= 800:{
            icon = 'clear.svg';
            break;
        }
        default:{
            icon = 'clouds.svg';
        }
    }
    return icon;
}