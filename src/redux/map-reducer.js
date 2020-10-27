import {CurrentWeather} from "../api/api";

const GET_CURRENT_WEATHER = 'GET_CURRENT_WEATHER'

const initialState = {
    markers: []
}

const MapReducer = (state = initialState, action) => {
    switch (action.type) {
        case (GET_CURRENT_WEATHER):
            return {
                ...state,
                markers: [...state.markers, {icon: action.icon, temp: action.temp, latlng: action.latlng}]
            }
        default:
            return state
    }
}

const getCurrentWeather = (icon, temp, latlng) => ({type: GET_CURRENT_WEATHER, icon, temp, latlng})

export const setMarker = (lat, lon) => {
    return dispatch => {
        CurrentWeather.getCurrentWeather(lat, lon)
            .then(response => {
                console.log(response)
                dispatch(getCurrentWeather(
                    response.data.weather[0].icon,
                    Math.ceil(response.data.main.temp),
                    {lat: lat, lng:lon}
                ))
            })
    }
}

export default MapReducer
