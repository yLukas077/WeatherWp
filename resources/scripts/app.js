import domReady from '@roots/sage/client/dom-ready';

/**
 * Application entrypoint
 */
domReady(() => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      fetchWeatherData(position.coords.latitude, position.coords.longitude);
    }, function(error) {
      document.getElementById('weather').innerText = 'Não foi possível obter a localização.';
    });
  } else {
    document.getElementById('weather').innerText = 'Geolocalização não suportada neste navegador.';
  }
});

function fetchWeatherData(lat, lon) {
  const apiKey = 'd9ccca83e50b3b83bf9c7e408990ca7a';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temp = data.main.temp;
      const weather = data.weather[0].description;
      document.getElementById('weather').innerHTML = `Temperatura atual: ${temp}°C <br>Condição: ${weather}`;
    })
    .catch(error => {
      console.error('Erro ao buscar dados da API', error);
      document.getElementById('weather').innerText = 'Erro ao obter dados da previsão do tempo.';
    });
}

/**
 * @see {@link https://webpack.js.org/api/hot-module-replacement/}
 */
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(console.error);
}
