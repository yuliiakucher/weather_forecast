import * as axios from 'axios'

const api_key = 'a8de334d1f2f9e32c071bebca2a3e9ac'

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
})

export const CurrentWeather = {
    getCurrentWeather(lat, lon, units = 'metric') {
        return (
            instance.get(`weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=${units}`)
        )
    },
    getFavCity(city, units = 'metric') {
        return (
            instance.get(`weather?q=${city}&appid=${api_key}&units=${units}`)
        )
    },
    get7DaysForecast(lat, lon, units = 'metric') {
        return (
            instance.get(`onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${api_key}&units=${units}`)
        )
    }
}
