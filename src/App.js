import React, {useEffect} from 'react';
import './App.css';
import HomePage from "./components/HomePage/HomePage";
import {Route} from "react-router-dom";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";
import Header from "./components/Header/Header";
import {connect} from "react-redux";
import {getInfoFromCoordinates} from "./redux/current-reducer";
import {getForecastInfo} from "./redux/forecast-reducer";

const App = (props) => {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position.coords.latitude, position.coords.longitude)
            props.getForecastInfo(position.coords.latitude, position.coords.longitude)
        });
    })
    return (
        <>
            <Header/>
            <Route exact path='/' render={() => <HomePage/>}/>
            <Route path='/details' render={() => <WeatherDetails/>}/>
        </>
    );
}

export default connect(null, {getInfoFromCoordinates, getForecastInfo})(App);
