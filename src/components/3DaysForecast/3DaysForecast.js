import React from "react";
import Card from "react-bootstrap/Card";
import OneDayForecast from "./OneDayForecast/OneDayForecast";
import {connect} from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import {NavLink} from "react-router-dom";
import styles from '../Header/Header.module.css'


const ThreeDaysForecast = (props) => {
    return (
        <Card>
            <Card.Header className='d-flex flex-row justify-content-between'>
                <Card.Title>
                    3 Days Forecast
                </Card.Title>
                <NavLink to='/details' style={{textDecoration: 'none', color: '#000'}} className={styles.link}>
                    See more...
                </NavLink>
            </Card.Header>
            <Card.Body>

                {props.isLoading
                    ? <Spinner animation="border" role="status"/>
                    : props.three_days_forecast.map((one_day_forecast, index) => {
                            return <OneDayForecast
                                units={props.units}
                                key={index}
                                date={one_day_forecast.dt}
                                temp_min={one_day_forecast.temp.min}
                                temp_max={one_day_forecast.temp.max}
                                icon={one_day_forecast.weather[0].icon}
                                details={one_day_forecast.weather[0].main}
                            />
                        }
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
        units: state.CurrentReducer.units
    }
}

export default connect(mapStateToProps)(ThreeDaysForecast)
