import * as axios from 'axios'

const api_key = 'a8de334d1f2f9e32c071bebca2a3e9ac'

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
})

export const CurrentWeather = {
    getCurrentWeather(lat, lon) {
        return(
            instance.get(`weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
        )
    },
    getThreeDaysForecast(lat, lon) {
        return(
            instance.get(`forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
        )
    },
    getFavCity(city) {
        return(
            instance.get(`weather?q=${city}&appid=${api_key}&units=metric`)
        )
    },
}
