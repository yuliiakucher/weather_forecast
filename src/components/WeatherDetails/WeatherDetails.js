import React from "react";
import {Container, Card, Row, Col} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faWind} from '@fortawesome/free-solid-svg-icons'
import {windRose} from "../../utilits/utilits";
import OneDayForecast from "../3DaysForecast/OneDayForecast/OneDayForecast";

const WeatherDetails = ({details, seven_days_forecast, units}) => {

    const date = new Date(details.dt * 1000)
    const time = date.toLocaleTimeString().slice(0, 5)
    const day = date.toLocaleDateString()

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <p style={{color: '#fc623e'}}>{time}, {day}</p>
                            <Card.Title><h1>{details.name}, {details.sys.country}</h1></Card.Title>
                            <div>
                                <img src={`http://openweathermap.org/img/wn/${details.weather[0].icon}@2x.png`}
                                     alt='weather-icon'/>
                                <span>{Math.ceil(details.main.temp)} {units === 'metric' ? '°C' : 'F'}</span>
                            </div>
                            <div>
                                <p>Feels like {Math.ceil(details.main.feels_like)}{units === 'metric' ? '°C' : 'F'}. {details
                                    .weather[0].description[0].toUpperCase()}
                                    {details.weather[0].description.slice(1)}</p>
                            </div>
                            <div>
                                <p>
                                    <FontAwesomeIcon icon={faWind}/>
                                    {details.wind.speed} {units === 'metric' ? 'm/s' : 'mph'} {windRose(details.wind.deg)} Pressure:
                                    {details.main.pressure}hPa Humidity: {details.main.humidity}%
                                </p>
                                <p>
                                    Visibility: {details.visibility / 100} km
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title><h2>8-day forecast</h2></Card.Title>
                            {seven_days_forecast.daily.map((day, index) => {
                                    const {min, max} = day.temp
                                    const {icon, main} = day.weather[0]
                                    return <OneDayForecast
                                        units={units}
                                        key={index}
                                        temp_max={max}
                                        temp_min={min}
                                        icon={icon}
                                        date={day.dt}
                                        details={main}/>
                                }
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


        </Container>

    )
}


export default WeatherDetails
