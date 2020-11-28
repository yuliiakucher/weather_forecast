import React, {useEffect} from 'react';
import './App.css';
import HomePage from "./components/HomePage/HomePage";
import {Redirect, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import {connect} from "react-redux";
import {getInfoFromCoordinates} from "./redux/current-reducer";
import {getForecastInfo} from "./redux/forecast-reducer";
import WeatherDetailsContainer from "./components/WeatherDetails/WeatherDetailsContainer";

const App = (props) => {

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            localStorage.setItem('lat', position.coords.latitude)
            localStorage.setItem('lon', position.coords.longitude)
        }, () => {
            localStorage.setItem('lat', 51.5074)
            localStorage.setItem('lon', 0.1278)
        })
    }


    useEffect(() => {
        getCurrentLocation()
        props.getForecastInfo(localStorage.getItem('lat'), localStorage.getItem('lon'), props.units)
    }, [props.units])

    return (
        <>
            <Header/>
            <Redirect from="/" to="/weather_forecast"/>
            <Route exact path='/weather_forecast' render={() => <HomePage/>}/>
            <Route path='/details' render={() => <WeatherDetailsContainer/>}/>
        </>
    );
}

let mapStateToProps = (state) => {
    return{
        units: state.CurrentReducer.units
    }
}

export default connect(mapStateToProps, {getInfoFromCoordinates, getForecastInfo})(App);
