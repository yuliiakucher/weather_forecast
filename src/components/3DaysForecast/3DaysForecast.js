import React from "react";
import Card from "react-bootstrap/Card";
import OneDayForecast from "./OneDayForecast/OneDayForecast";
import {connect} from "react-redux";
import Spinner from "react-bootstrap/Spinner";

const ThreeDaysForecast = (props) => {
    return (
        <Card>
            <Card.Header>
                <Card.Title>
                    3 Days Forecast
                </Card.Title>
            </Card.Header>
            <Card.Body>
                {props.isLoading
                    ? <Spinner animation="border" role="status"/>
                    : props.three_days_forecast.map(one_day_forecast => (
                            <OneDayForecast
                                key={one_day_forecast.temp_min}
                                date={one_day_forecast.date}
                                temp_min={one_day_forecast.temp_min}
                                temp_max={one_day_forecast.temp_max}
                                icon={one_day_forecast.icon}
                                details={one_day_forecast.details}/>
                        )
                    )
                }


            </Card.Body>
        </Card>
    )
}

let mapStateToProps = (state) => {
    return {
        three_days_forecast: state.ForecastReducer.three_days_forecast,
        isLoading: state.ForecastReducer.isLoading,

    }
}

export default connect(mapStateToProps)(ThreeDaysForecast)
