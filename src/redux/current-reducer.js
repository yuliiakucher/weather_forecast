import {CurrentWeather} from "../api/api";

const GET_INFO_FROM_COORDINATES = 'GET_INFO_FROM_COORDINATES'

const initialState = {
    city: null,
    temp: null,
    icon: null
}

const CurrentReducer = (state=initialState, action) => {
    switch (action.type) {
        case (GET_INFO_FROM_COORDINATES):{
            return {
                ...state,
                city: action.city,
                temp: Math.ceil(action.temp),
                icon: action.icon,
                main: action.main
            }

        }
        default:
            return state
    }
}

const setInfoFromCoordinates = (city, temp, icon, main) => ({type: GET_INFO_FROM_COORDINATES, city, temp, icon, main})

export const getInfoFromCoordinates = (lat, lon) => {
    return (dispatch) => {
        CurrentWeather.getCurrentWeather(lat, lon)
            .then(response => {
                console.log(response)
                dispatch(setInfoFromCoordinates(response.data.name,
                    response.data.main.temp,
                    response.data.weather[0].icon,
                    response.data.weather[0].main
                ))
            })
    }
}

export default CurrentReducer
