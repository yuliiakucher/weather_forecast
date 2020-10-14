import {CurrentWeather} from "../api/api";

const GET_FAV_PLACE_INFO = 'GET_FAV_PLACE_INFO'

const initialState = {
    favs: []
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
        default:
            return state

    }
}

const windRose = (degr) => {
    switch (true) {
        case  (degr > 22.5 && degr < 67.5): return 'NE'
        case  (degr > 67.5 && degr<112.5): return 'E'
        case  (degr > 112.5 && degr<157.5): return 'SE'
        case  (degr > 157.5  && degr< 202.5) : return 'S'
        case  (degr > 202.5  && degr< 247.5) : return 'SW'
        case ( degr > 247.5  && degr< 292.5 ): return 'W'
        case  (degr > 292.5  && degr< 337.5 ): return 'NW'
        default: return 'N'
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

export const getFavPlace = (city) => {
    return dispatch => {
        CurrentWeather.getFavCity(city)
            .then(response => {
                console.log(response.data)
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


export default FavReducer
