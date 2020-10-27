import React, {useEffect} from "react";
import Container from "react-bootstrap/Container";
import style from "../HomePage/HomePage.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {getInfoFromCoordinates} from "../../redux/current-reducer";
import {getForecastInfo} from "../../redux/forecast-reducer";

const Header = ({city, temp, main, icon, getInfoFromCoordinates}) => {

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            getInfoFromCoordinates(position.coords.latitude, position.coords.longitude)
        });
    }, [])
    return(
        <Container className={style.background}>
            <Row>
                <Col lg={1} className={'d-flex flex-column justify-content-start'}>
                    <div>
                        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather-icon'/>
                    </div>

                </Col>
                <Col lg={2} className={'d-flex flex-column justify-content-center align-items-start'}>
                    <h3>{city}</h3>
                    <h4>{temp}°C</h4>
                    <h4>{main}</h4>
                </Col>

            </Row>
            <Row>
                <NavLink to={'/details'}>
                    details...
                </NavLink>
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

export default connect(mapStateToProps, {getInfoFromCoordinates, getForecastInfo})(Header)

