import React, {useEffect} from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import style from './FavCity.module.css'
import Button from "react-bootstrap/Button";

const FavCity = ({name, country, temp, icon, humidity, wind_dir, wind_speed, favsStorage, changeStorage}) => {

    useEffect(()=> {
        console.log(favsStorage)
    }, [favsStorage])

    const deleteFromFavs = (name) => {
        const fav_locations = localStorage.getItem('fav_location')
        localStorage.setItem('fav_location', fav_locations.split(' ').filter(word => word !== name).join(' '))
        changeStorage(localStorage.getItem('fav_location'))
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
