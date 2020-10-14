import {CurrentWeather} from "../api/api";

const GET_FORECAST_INFO = 'GET_FORECAST_INFO'
const SET_PRELOADER = 'SET_PRELOADER'

const initialState = {
    three_days_forecast: [
    ],
    isLoading: true

}

const ForecastReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FORECAST_INFO: {
            return {
                ...state,
                three_days_forecast: [...state.three_days_forecast, {
                    date: action.date,
                    temp_min: Math.ceil(action.temp_min),
                    temp_max: Math.ceil(action.temp_max),
                    icon: action.icon,
                    details: action.details
                }],

            }
        }
        case SET_PRELOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        default:
            return state
    }
}

const setForecastInfo = (date, temp_min, temp_max, icon, details) => ({
    type: GET_FORECAST_INFO,
    date,
    temp_min,
    temp_max,
    icon,
    details
})

export let setPreloader = (value) => ({type: SET_PRELOADER, value})

export const getForecastInfo = (lat, lon) => {
    return (dispatch) => {
        CurrentWeather.getThreeDaysForecast(lat, lon)
            .then(response => {
                const nowData = new Date()

                const day1 = response.data.list.filter(item => {
                    const d = new Date(item.dt_txt)
                    return (
                        d.getDate() === nowData.getDate() + 1
                    )
                })
                day1.sort((a, b) => a.main.temp - b.main.temp)
                dispatch(setForecastInfo(day1[0].dt_txt,
                    day1[0].main.temp,
                    day1[7].main.temp,
                    day1[0].weather[0].icon,
                    day1[0].weather[0].main,
                ))

                const day2 = response.data.list.filter(item => {
                    const d = new Date(item.dt_txt)
                    return (
                        d.getDate() === nowData.getDate() + 2
                    )
                })
                day2.sort((a, b) => a.main.temp - b.main.temp)
                dispatch(setForecastInfo(day2[0].dt_txt,
                    day2[0].main.temp,
                    day2[7].main.temp,
                    day2[0].weather[0].icon,
                    day2[0].weather[0].main,
                ))

                const day3 = response.data.list.filter(item => {
                    const d = new Date(item.dt_txt)
                    return (
                        d.getDate() === nowData.getDate() + 3
                    )
                })
                day3.sort((a, b) => a.main.temp - b.main.temp)
                dispatch(setForecastInfo(day3[0].dt_txt,
                    day3[0].main.temp,
                    day3[7].main.temp,
                    day3[0].weather[0].icon,
                    day3[0].weather[0].main,
                ))
                dispatch(setPreloader(false))

            })

    }
}

export default ForecastReducer
