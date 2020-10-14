import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import style from './FavCity.module.css'

const FavCity = ({name, country, temp, icon, humidity, wind_dir, wind_speed}) => {
    return (
        <Card className='m-1'>
            <Card.Body>
                <Row>
                    <Col className={style.icon}>
                        <Image

                            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/>
                    </Col>
                    <Col>
                        <h4>{temp}°C</h4>
                    </Col>
                    <Col className={style.name}>
                        <p>{name}</p>
                        <p>{country}</p>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col>
                        <p> Humidity: {humidity}%</p>
                    </Col>
                    <Col>Wind direction: {wind_dir}</Col>
                    <Col>{wind_speed} meter/sec</Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export default FavCity
