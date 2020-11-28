import {CurrentWeather} from "../api/api";

const GET_FORECAST_INFO = 'GET_FORECAST_INFO'
const GET_7DAYS_FORECAST = 'GET_7DAYS_FORECAST'
const SET_PRELOADER = 'SET_PRELOADER'
const SET_PRELOADER_7DAYS = 'SET_PRELOADER_7DAYS'

const initialState = {
    three_days_forecast: [],
    seven_days_forecast: [],
    isLoading: true,
    isLoading7Days: true

}

const ForecastReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FORECAST_INFO: {
            return {
                ...state,
                three_days_forecast: action.payload
            }
        }
        case SET_PRELOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case SET_PRELOADER_7DAYS: {
            return {
                ...state,
                isLoading7Days: action.value
            }
        }
        case GET_7DAYS_FORECAST: {
            return {
                ...state,
                seven_days_forecast: action.payload
            }
        }
        default:
            return state
    }
}

const setForecastInfo = (payload) => ({type: GET_FORECAST_INFO, payload})

const set7DaysForecast = (payload) => ({type: GET_7DAYS_FORECAST, payload})

export let setPreloader = (value) => ({type: SET_PRELOADER, value})
export let setPreloader7Days = (value) => ({type: SET_PRELOADER_7DAYS, value})

export const getForecastInfo = (lat, lon, units) => {
    return (dispatch) => {
        CurrentWeather.get7DaysForecast(lat, lon, units)
            .then(response => {
                dispatch(setForecastInfo(response.data.daily.slice(1,4)))
                dispatch(setPreloader(false))
            })

    }
}

export const get7DaysForecast = (lat, lon, units) => {
    return dispatch => {
        dispatch(setPreloader7Days(true))
        CurrentWeather.get7DaysForecast(lat, lon, units)
            .then(response => {
                dispatch(set7DaysForecast(response.data))
                dispatch(setPreloader7Days(false))
            })
    }
}

export default ForecastReducer
