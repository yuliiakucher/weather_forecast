import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import style from './OneDayForecast.module.css'

const OneDayForecast = ({date, temp_min, temp_max, icon, details, units}) => {
    const local_date = new Date(date * 1000)

    return (
        <Card.Body className={style.card_body}>
            <Row>
                <Col lg={3}>
                    <Card.Img style={{maxWidth: '100px'}} src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/>
                </Col>
                <Col>
                    <Card.Title>{local_date.toDateString().split(' ')[0]},
                        {local_date.toDateString().split(' ')[1]} {local_date.toDateString().split(' ')[2]}
                    </Card.Title>
                    <Card.Subtitle>{details}</Card.Subtitle>
                </Col>
                <Col className={style.right_badge} lg={3}>
                    <div>{Math.ceil(temp_min)}
                        {units === 'metric' ? '°C' : 'F'}/{Math.ceil(temp_max)}
                        {units === 'metric' ? '°C' : 'F'}</div>
                </Col>
            </Row>
        </Card.Body>


    )
}

export default OneDayForecast
