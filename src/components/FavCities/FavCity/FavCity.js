import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import style from './FavCity.module.css'
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faWind, faTint} from '@fortawesome/free-solid-svg-icons'

const FavCity = ({
                     name, country, temp, icon,
                     humidity, wind_dir, wind_speed,
                     getFavPlace, units, clearFavs
                 }) => {

    const deleteFromFavs = (name) => {
        const fav_locations = localStorage.getItem('fav_location')
        localStorage.setItem('fav_location', fav_locations.split(' ').filter(word => word !== name).join(' '))
        const locations = localStorage.getItem('fav_location').split(' ')
        clearFavs()
        locations[0] && locations.map(location => getFavPlace(location, units))
    }

    return (
        <Card className='m-1'>
            <Row className='m-1 d-flex flex-column align-items-end'>
                <Button
                    variant={'outline-info'}
                    className='w-25 btn-sm'
                    onClick={() => deleteFromFavs(name)}
                >X</Button>
            </Row>

            <Card.Body>
                <Row>
                    <Col className={style.icon} lg={3}>
                        <Image
                            style={{maxWidth: '70px'}}
                            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/>
                    </Col>
                    <Col>
                        <h4>{temp}°C</h4>
                    </Col>
                    <Col className={style.name}>
                        <div>{name}</div>
                        <div>{country}</div>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <div><FontAwesomeIcon icon={faTint}/> Humidity: {humidity}%</div>
                </Row>
                <Row>
                    <div><FontAwesomeIcon icon={faWind}/> {wind_speed}m/s {wind_dir}</div>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export default FavCity
