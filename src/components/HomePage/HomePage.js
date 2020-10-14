import React, {useEffect} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import style from './HomePage.module.css'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ThreeDaysForecast from "../3DaysForecast/3DaysForecast";
import {connect} from "react-redux";
import {getInfoFromCoordinates} from "../../redux/current-reducer";
import Image from "react-bootstrap/Image";
import {getForecastInfo} from "../../redux/forecast-reducer";
import FavCity from "../FavCities/FavCity/FavCity";
import Button from "react-bootstrap/Button";
import FavCities from "../FavCities/FavCities";

const HomePage = ({city, temp, icon, main, getInfoFromCoordinates, getForecastInfo}) => {

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position.coords.latitude, position.coords.longitude)
            getInfoFromCoordinates(position.coords.latitude, position.coords.longitude)
            getForecastInfo(position.coords.latitude, position.coords.longitude)
        });
    }, [])
    return (
        <Container className='m-4'>
            <Row>
                <Col>
                    <Container className={style.background}>
                        <Row>
                            <Col lg={1}>
                                <h3>{city}</h3>
                                <h4>{temp}°C</h4>
                            </Col>
                            <Col>
                                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather-icon'/>
                                <h4>{main}</h4>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ThreeDaysForecast/>
                </Col>
                <Col>2</Col>
                <Col>
                    <FavCities/>
                </Col>
            </Row>
        </Container>
    )
}

let mapStateToProps = (state) => {
    return {
        city: state.CurrentReducer.city,
        temp: state.CurrentReducer.temp,
        icon: state.CurrentReducer.icon,
        main: state.CurrentReducer.main,

    }
}

export default connect(mapStateToProps, {getInfoFromCoordinates, getForecastInfo})(HomePage)
