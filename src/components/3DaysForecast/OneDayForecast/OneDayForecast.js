import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import style from './OneDayForecast.module.css'

const OneDayForecast = ({date, temp_min,temp_max, icon, details,}) => {
    const local_date = new Date(date)
    return(

            <Card.Body className={style.card_body}>
                <Row >
                    <Col><Card.Img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/> </Col>
                    <Col>
                        <Card.Title>{local_date.toDateString().split(' ')[0]}</Card.Title>
                        <Card.Subtitle>{details}</Card.Subtitle>
                    </Col>
                    <Col className={style.right_badge}>
                        <div>{temp_min}°C/{temp_max}°C</div>
                    </Col>
                </Row>
            </Card.Body>


    )
}

export default OneDayForecast
