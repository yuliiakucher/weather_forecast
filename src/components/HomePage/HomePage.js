import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ThreeDaysForecast from "../3DaysForecast/3DaysForecast";
import {connect} from "react-redux";
import {getInfoFromCoordinates} from "../../redux/current-reducer";
import {getForecastInfo} from "../../redux/forecast-reducer";
import WeatherMap from "../WeatherMap/WeatherMap";
import FavCitiesClass from "../FavCities/FavCitiesClass";


const HomePage = () => {

    return (
        <Container className='m-4'>
            <Row>
                <Col>
                    <ThreeDaysForecast/>
                </Col>
                <Col>
                    <WeatherMap/>
                </Col>
                <Col>
                    <FavCitiesClass/>
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
