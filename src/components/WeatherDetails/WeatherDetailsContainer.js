import React, {useEffect} from "react";
import {connect} from 'react-redux'
import {Spinner} from "react-bootstrap";
import {getWeatherDetails} from "../../redux/current-reducer";
import WeatherDetails from "./WeatherDetails";
import {get7DaysForecast} from "../../redux/forecast-reducer";

const WeatherDetailsContainer = ({
                                     getWeatherDetails, details,
                                     isLoading, get7DaysForecast, seven_days_forecast,
                                     isLoadingForecast, units
                                 }) => {

    const lat = localStorage.getItem('lat')
    const lon = localStorage.getItem('lon')

    useEffect(() => {
        getWeatherDetails(lat, lon, units)
        get7DaysForecast(lat, lon, units)
    }, [units])

    return (
        <div className='d-flex flex-column align-items-center'>
            {isLoading || isLoadingForecast
                ? <Spinner animation="border" variant="info"/>
                : <WeatherDetails
                    details={details}
                    seven_days_forecast={seven_days_forecast}
                    units={units}/>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        details: state.CurrentReducer.details,
        isLoading: state.CurrentReducer.isLoading,
        isLoadingForecast: state.ForecastReducer.isLoading7Days,
        seven_days_forecast: state.ForecastReducer.seven_days_forecast,
        units: state.CurrentReducer.units
    }
}

export default connect(mapStateToProps, {getWeatherDetails, get7DaysForecast})(WeatherDetailsContainer)
