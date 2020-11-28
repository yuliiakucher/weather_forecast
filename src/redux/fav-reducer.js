import {CurrentWeather} from "../api/api";
import {windRose} from "../utilits/utilits";

const GET_FAV_PLACE_INFO = 'GET_FAV_PLACE_INFO'
const CLEAR_FAVS = 'CLEAR_FAVS'

const initialState = {
    favs: [],
    favsStorage: ''
}

const FavReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FAV_PLACE_INFO: {
            return {
                ...state,
                favs: [...state.favs, {
                    name: action.name,
                    country: action.country,
                    temp: action.temp,
                    icon: action.icon,
                    humidity: action.humidity,
                    wind_dir: action.wind_dir,
                    wind_speed: action.wind_speed
                }]
            }
        }
        case CLEAR_FAVS: {
            return {
                ...state,
                favs: []
            }
        }
        default:
            return state

    }
}


const setFavPlace = (name, country, temp, icon, humidity, wind_dir, wind_speed) => ({
    type: GET_FAV_PLACE_INFO,
    name,
    country,
    temp,
    icon,
    humidity,
    wind_dir,
    wind_speed
})

const setClearFavs = () => ({type: CLEAR_FAVS})

export const getFavPlace = (city, units) => {
    return dispatch => {
        CurrentWeather.getFavCity(city, units)
            .then(response => {
                dispatch(setFavPlace(
                    response.data.name,
                    response.data.sys.country,
                    Math.ceil(response.data.main.temp),
                    response.data.weather[0].icon,
                    response.data.main.humidity,
                    windRose(response.data.wind.deg),
                    response.data.wind.speed,
                ))
            })
    }
}

export const clearFavs = () => {
    return dispatch => {
        dispatch(setClearFavs())
    }
}


export default FavReducer
