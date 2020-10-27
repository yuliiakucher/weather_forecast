// @flow
import React from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import style from './WeatherMap.module.css'
import {setMarker} from "../../redux/map-reducer";
import {connect} from "react-redux";


class WeatherMap extends React.Component {

    state = {
        markers: [[49.823, 23.959]],
    }


    addMarker = (e) => {
        const {markers} = this.state
        console.log(markers)
        markers.push(e.latlng)
        console.log(markers)
        this.props.setMarker(e.latlng.lat, e.latlng.lng)
        this.setState({markers})
    }


    render() {
        return (
            <Map
                center={[49.823, 23.959]}
                onClick={this.addMarker}
                zoom={13}
                // layers={['precipitation_new']}
                className={style.leaflet_container}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    // url='https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=a8de334d1f2f9e32c071bebca2a3e9ac'
                />
                { this.props.markers.map((marker, index) =>

                    <Marker key={index} position={marker.latlng}
                            // icon={new Icon({
                            // iconUrl: `http://openweathermap.org/img/wn/${marker.icon}@2x.png`,
                            // iconSize: [50, 50]},)}
                    >
                        <Popup autoPan>
                            <img style={{width: '50px'}} src={`http://openweathermap.org/img/wn/${marker.icon}@2x.png`} alt={'weather'}/>
                            <span>{marker.temp}°C</span>
                        </Popup>
                    </Marker>
                )}
            </Map>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        markers: state.MapReducer.markers
    }
}


export default connect(mapStateToProps, {setMarker})(WeatherMap)
