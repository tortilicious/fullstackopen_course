import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const getWeather = (country) => {

  const [lat, lon] = country.capitalInfo.latlng
  const request = axios
      .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${API_KEY}`)
  return request.then(response => response.data)
}

export default {getWeather}