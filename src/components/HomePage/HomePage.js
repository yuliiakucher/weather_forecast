import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ThreeDaysForecast from "../3DaysForecast/3DaysForecast";
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
                <Col lg={3}>
                    <FavCitiesClass/>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage
