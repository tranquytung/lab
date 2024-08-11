const apiKey = 'c2d45d4153edf003e7d0fdb792ed522e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const weatherInfo = document.querySelector('.weather-info');
const weatherSearchCity = document.querySelector('.weather-search-city');
const weatherSearchError = document.querySelector('.weather-search-error');

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




const btn_search = document.getElementById('btn-search');

btn_search.addEventListener('click', async (e) => {
    e.preventDefault();
    let search = document.querySelector('#search');
    const result = await fetchData(search.value);

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
        wind: {speed}
    } = result;

    weatherInfo.style.display = 'flex';
    weatherSearchCity.style.display = 'none';
    weatherSearchError.style.display = 'none';

    document.querySelector('.country').innerText = `${name}, ${country}`;
    document.querySelector('.temp').innerHTML = `${temp} &#x2103`;
    document.querySelector('#speed').innerHTML = `${speed} M/s`;
    document.querySelector('#humidity').innerHTML = `${humidity} %`;
})