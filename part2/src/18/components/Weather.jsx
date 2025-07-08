import weatherService from "../service/WeatherService.js";
import {useEffect, useState} from "react";

const Weather = ({country}) => {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => {
    weatherService
        .getWeather(country)
        .then(response => {
          setWeatherData(response)
        })
        .catch(error =>{
          console.error('Error: ', error)
          setError(error)
        })
  }, [country])

  if (!weatherData) {
    return <div>No weather data available.</div>
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`

  return (
      <div>
        <h1>Weather in {country.capital}</h1>
        <p>Temperature {weatherData.current.temp}°C</p>
        <img src={iconUrl} alt="weather icon" />
        <p>Wind speed: {weatherData.current.wind_speed} m/s</p>
      </div>
  )
}
export default Weather