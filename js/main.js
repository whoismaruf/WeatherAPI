console.log("It's working!");
const searchButton = document.getElementById('searchButton');
const spinner = document.getElementById('spinner');
const spinnerText = document.getElementById('spinner-text');
const cityInput = document.getElementById('city-input');

const API_KEY = '560bf65a383c8af83f6edc08e83b7047';

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
}

const searchButtonHandler = () => {
    toggleSpinnerButton(true);
    const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${API_KEY}`
    fetchData(API_ENDPOINT)
}