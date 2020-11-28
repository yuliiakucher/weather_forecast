import React, {useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {getInfoFromCoordinates, getUnits} from "../../redux/current-reducer";
import styles from './Header.module.css'
import cn from 'classnames'

const Header = ({city, country, temp, main, icon, getInfoFromCoordinates, getUnits, units}) => {

    const [isFahrenheit, setFahrenheit] = React.useState(true);

    const toggleSwitcher = () => {
        setFahrenheit(!isFahrenheit);
        isFahrenheit ? getUnits('imperial') : getUnits('metric')

    };
    useEffect(() => {
        getInfoFromCoordinates(localStorage.getItem('lat'), localStorage.getItem('lon'), units)
    }, [units])
    return (
        <Container className={styles.background}>
            <Row>
                <Col lg={1} className={'d-flex flex-column justify-content-start ml-5'}>
                    <div>
                        <NavLink to={'/weather_forecast'}>
                            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather-icon'/>
                        </NavLink>
                    </div>

                </Col>
                <Col lg={1} className={'d-flex flex-column justify-content-center align-items-start'}>
                    <h4>{temp} {units === 'metric' ?'°C': 'F'}</h4>
                    <h4>{main}</h4>
                </Col>
                <Col lg={2}
                     className={'d-flex flex-column justify-content-center align-items-start'}>
                    <h3>{city}, {country}</h3>
                </Col>
                <Col lg={7} className='d-flex flex-row justify-content-end align-items-end'>
                    <div className='d-flex flex-row align-items-center'>
                        <span className='mx-2 font-weight-bold'>°C</span>
                        <label className={styles.switch}>
                            <input type="checkbox" value={isFahrenheit} onChange={toggleSwitcher}/>
                            <span className={cn(styles.slider, styles.round)}></span>
                        </label>
                        <span className='mx-2 font-weight-bold'>F</span>
                    </div>

                </Col>

            </Row>
        </Container>
    )
}

let mapStateToProps = (state) => {
    return {
        city: state.CurrentReducer.city,
        country: state.CurrentReducer.country,
        temp: state.CurrentReducer.temp,
        icon: state.CurrentReducer.icon,
        main: state.CurrentReducer.main,
        units: state.CurrentReducer.units

    }
}

export default connect(mapStateToProps, {getInfoFromCoordinates, getUnits})(Header)

