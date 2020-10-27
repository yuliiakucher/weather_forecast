import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FavCity from "./FavCity/FavCity";
import {connect} from "react-redux";
import {changeStorage, getFavPlace} from "../../redux/fav-reducer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class FavCitiesClass extends React.Component<{ favs: any, getFavPlace: any, changeStorage: any, favsStorage: any }> {
    state = {
        show: false,
        input: ''
    }

    componentDidMount() {
        if (localStorage.getItem('fav_location')) {
            const locations = localStorage.getItem('fav_location').split(' ')
            locations.map(location => this.props.getFavPlace(location))
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        console.log(prevProps, this.props.favsStorage)
    }

    handleSubmit = (data) => {
        this.props.getFavPlace(data)
        if (localStorage.getItem('fav_location')) {
            const local = localStorage.getItem('fav_location').split(' ')
            local.push(data)
            localStorage.setItem('fav_location', local.join(' '))
            this.props.changeStorage(localStorage.getItem('fav_location'))
        } else {
            localStorage.setItem('fav_location', data)
            this.props.changeStorage(localStorage.getItem('fav_location'))
        }
        console.log(data)
    }

    render() {


        return (
            <>
                <h3>Your Locations</h3>
                <Container className='m-4'>
                    <Row>
                        <Col lg={5}>
                            <Button variant={'info'} onClick={() => this.setState({show: !this.state.show})}>Add city</Button>
                        </Col>
                        <Col lg={4}>
                            {this.state.show &&
                            <Form.Control
                                onChange={e => this.setState({input: e.target.value})}
                                value={this.state.input}
                            />
                            }
                        </Col>
                        <Col>
                            {this.state.show &&
                            <Button variant={'info'} onClick={() => this.handleSubmit(this.state.input)}>+</Button>
                            }
                        </Col>
                    </Row>
                </Container>


                {this.props.favs.map(fav => (
                        <FavCity
                            name={fav.name}
                            country={fav.country}
                            temp={fav.temp}
                            icon={fav.icon}
                            humidity={fav.humidity}
                            wind_dir={fav.wind_dir}
                            wind_speed={fav.wind_speed}
                            favsStorage={this.props.favsStorage}
                            changeStorage={changeStorage}
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
        favsStorage: state.FavReducer.favsStorage
    }
}

export default connect(mapStateToProps, {getFavPlace, changeStorage})(FavCitiesClass)
