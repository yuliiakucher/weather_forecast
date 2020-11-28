import {CurrentWeather} from "../api/api";

const GET_INFO_FROM_COORDINATES = 'GET_INFO_FROM_COORDINATES'
const GET_WEATHER_DETAILS = 'GET_WEATHER_DETAILS'
const SET_LOADER = 'current/SET_PRELOADER'
const SET_UNITS = 'SET_UNITS'


const initialState = {
    city: null,
    country: null,
    temp: null,
    icon: null,
    details: '',
    isLoading: true,
    units: 'metric'

}

const CurrentReducer = (state = initialState, action) => {
    switch (action.type) {
        case (GET_INFO_FROM_COORDINATES): {
            return {
                ...state,
                city: action.city,
                country: action.country,
                temp: Math.ceil(action.temp),
                icon: action.icon,
                main: action.main
            }

        }
        case GET_WEATHER_DETAILS: {
            return {
                ...state,
                details: action.payload
            }
        }
        case SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case SET_UNITS: {
            return {
                ...state,
                units: action.units
            }
        }
        default:
            return state
    }
}
const setPreloader = (value) => ({type: SET_LOADER, value})
const setInfoFromCoordinates = (city,country, temp, icon, main) => ({type: GET_INFO_FROM_COORDINATES, city,country, temp, icon, main})
const setWeatherDetails = (payload) => ({type: GET_WEATHER_DETAILS, payload})
const setUnits = (units) => ({type: SET_UNITS, units})

export const getInfoFromCoordinates = (lat, lon, units) => {
    return (dispatch) => {
        CurrentWeather.getCurrentWeather(lat, lon, units)
            .then(response => {
                dispatch(setInfoFromCoordinates(
                    response.data.name,
                    response.data.sys.country,
                    response.data.main.temp,
                    response.data.weather[0].icon,
                    response.data.weather[0].main
                ))
            })
    }
}


export const getWeatherDetails = (lat, lon, units) => {
    return (dispatch) => {
        CurrentWeather.getCurrentWeather(lat, lon, units)
            .then(response => {
                dispatch(setWeatherDetails(response.data))
                dispatch(setPreloader(false))
            })
    }
}

export const getUnits = (units) => {
    return dispatch => {
        dispatch(setUnits(units))
    }
}



export default CurrentReducer
