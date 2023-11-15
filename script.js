
document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.querySelector('.search input');
    const searchButton = document.querySelector('.search button');
    const weatherContainer = document.querySelector('.weather');
    const errorContainer = document.querySelector('.error');
    const weatherIcon = document.querySelector('.weather-icon');
    const tempElement = document.querySelector('.temp');
    const cityElement = document.querySelector('.city');
    const humidityElement = document.querySelector('.humidity');
    const windElement = document.querySelector('.wind');

    const apiKey = 'd3c39f57206d5904890771c822ffaac3';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

    const getWeatherData = async () => {     //Informacion del clima
        const cityName = searchInput.value.trim();
        try {
            const url = `${apiUrl}${cityName}&appid=${apiKey}`;  //Se une el nombre de la ciudad con la dir
            const response = await axios.get(url); //Consulta 
            if (response.status === 200) {
                const weatherData = response.data;
                showWeatherInfo(weatherData);   //Si la respuesta es OK muestra datos
            } else {
                showError();
            }
        } catch (error) {
             showError();
        }
    };
    const showWeatherInfo = (data) => {         // Función para mostrar El clima y la informacion
        const iconCode = data.weather[0].main;
        const temperature = Math.round(data.main.temp);
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const cityName = data.name;
        const iconPath = `images/${ImagenClima(iconCode)}.png`;   //Ruta de la imagen 
        weatherIcon.src = iconPath;
        tempElement.textContent = `${temperature}°C`;
        cityElement.textContent = cityName;                //Detalles %, C, Km/h
        humidityElement.textContent = `${humidity}%`;
        windElement.textContent = `${windSpeed} km/h`;
        errorContainer.style.display = 'none';   //Para ocultar el contenedor del msj error 
        weatherContainer.style.display = 'block'; 
    };

    const showError = () => {                    //Muestra el mensaje de error del documento index.html
        errorContainer.style.display = 'block';
        weatherContainer.style.display = 'none';
    };

    const ImagenClima = (weatherCode) => {     //Escogemos la imgane acorde al clima 
        switch (weatherCode) {
            case 'Clouds':
                return 'clouds';
            case 'Clear':
                return 'clear';
            case 'Rain':
                return 'rain';
            case 'Drizzle':
                return 'drizzle';
            case 'Mist':
                return 'mist';
            default:
                return 'default';
        }
    };
    searchButton.addEventListener('click', getWeatherData);   //Para activarse al hacer Enter
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            getWeatherData();
        }
    });
});

