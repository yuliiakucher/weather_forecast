import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FavCity from "./FavCity/FavCity";
import {connect} from "react-redux";
import {clearFavs, getFavPlace} from "../../redux/fav-reducer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Accordion} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-regular-svg-icons'

class FavCitiesClass extends React.Component {

    state = {
        input: ''
    }


    componentDidMount() {
        if (localStorage.getItem('fav_location')) {
            const locations = localStorage.getItem('fav_location').split(' ')
            locations.map(location => this.props.getFavPlace(location, this.props.units))
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (localStorage.getItem('fav_location') && prevProps.units !== this.props.units) {
            this.props.clearFavs()
            const locations = localStorage.getItem('fav_location').split(' ')
            locations.map(location => this.props.getFavPlace(location, this.props.units))
        }
    }

    componentWillUnmount() {
        this.props.clearFavs()
    }


    handleSubmit = (data) => {
        if (localStorage.getItem('fav_location')) {
            const local = localStorage.getItem('fav_location').split(' ')
            if ((local.filter(item => item === data)).length === 0) {
                local.push(data)
                localStorage.setItem('fav_location', local.join(' '))
                this.props.getFavPlace(data, this.props.units)
            }
        } else {
            localStorage.setItem('fav_location', data)
            this.props.getFavPlace(data, this.props.units)
        }
        this.setState({input: ''})
    }

    render() {
        return (
            <>
                <h3><FontAwesomeIcon icon={faStar}/> Your Locations</h3>
                <Container className='m-2'>
                    <Row className='mx-2'>
                        <Accordion>
                            <Row lg={10}>
                                <Accordion.Toggle as={Button} variant="info" eventKey="0">
                                    Add city
                                </Accordion.Toggle>
                            </Row>
                            <Row lg={10} className='my-2'>
                                <Accordion.Collapse eventKey="0">
                                    <Row>
                                        <Col>
                                            <Form.Control
                                                onChange={e => this.setState({input: e.target.value})}
                                                value={this.state.input}/>
                                        </Col>
                                        <Col>
                                            <Button variant={'info'}
                                                    onClick={() => this.handleSubmit(this.state.input)}>+</Button>
                                        </Col>

                                    </Row>
                                </Accordion.Collapse>
                            </Row>

                        </Accordion>


                    </Row>
                </Container>


                {this.props.favs.map((fav, index) => (
                        <FavCity
                            units={this.props.units}
                            key={index}
                            name={fav.name}
                            country={fav.country}
                            temp={fav.temp}
                            icon={fav.icon}
                            humidity={fav.humidity}
                            wind_dir={fav.wind_dir}
                            wind_speed={fav.wind_speed}
                            getFavPlace={this.props.getFavPlace}
                            clearFavs={this.props.clearFavs}
                        />
                    )
                )}
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        favs: state.FavReducer.favs,
        units: state.CurrentReducer.units
    }
}

export default connect(mapStateToProps, {getFavPlace, clearFavs})(FavCitiesClass)
