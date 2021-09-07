console.log("It's working!");

// Get all ID of search area
const searchButton = document.getElementById('searchButton');
const spinner = document.getElementById('spinner');
const spinnerText = document.getElementById('spinner-text');
const cityInput = document.getElementById('city-input');

// Get all ID of search result section
const searchResultSection = document.getElementById('search-result');
const imgIcon = document.getElementById('weather-icon');
const cityName = document.getElementById('city-name');
const weatherTemp = document.getElementById('weather-temp');
const weatherCondition = document.getElementById('weather-condition');
const cityNotFound = document.getElementById('city-not-found');


const API_KEY = '560bf65a383c8af83f6edc08e83b7047';

// Disable the search button for null input

const toggleSpinnerButton = (signal) => {
    if (signal) {
        console.log('Signal found!')
        spinner.classList.remove('d-none');
        spinnerText.innerText = 'Searching...';
        searchButton.disabled = true;
    }
    else {
        console.log('Signal lost!')
        spinner.classList.add('d-none');
        spinnerText.innerText = 'Search';
        searchButton.disabled = false;
    }
}
const fetchData = (url) => {
    console.log('Fetching data...')
    fetch(url)
    .then(res => res.json())
    .then(json => showResults(json));
}

const showResults = (data) => {
    toggleSpinnerButton(false);
    cityInput.value = '';
    console.log(data);
    if (data.cod === '404') {
        cityNotFound.classList.remove('d-none');
    }
    else {
        cityNotFound.classList.add('d-none');
        imgIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        cityName.innerText = data.name;
        weatherTemp.innerText = data.main.temp;
        weatherCondition.innerText = data.weather[0].main;
    }
}

const searchButtonHandler = () => {
    if (cityInput.value) {
        toggleSpinnerButton(true);
        clearOutput();
        const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${API_KEY}&units=metric`
        fetchData(API_ENDPOINT)
    }
    else {
        console.log('Input required!');
    }
}

const clearOutput = () => {
    imgIcon.setAttribute('src', "");
    cityName.innerText = "";
    weatherTemp.innerText = "";
    weatherCondition.innerText = "";
}