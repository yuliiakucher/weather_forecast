import React from "react";
import {Map, Marker, TileLayer} from "react-leaflet";
import style from './WeatherMap.module.css'
import {setMarker} from "../../redux/map-reducer";
import {connect} from "react-redux";
import {divIcon} from "leaflet";
import {renderToStaticMarkup} from "react-dom/server";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'


class WeatherMap extends React.Component {

    state = {
        markers: [[49.823, 23.959]],
    }

    addMarker = (e) => {
        const {markers} = this.state
        markers.push(e.latlng)
        this.props.setMarker(e.latlng.lat, e.latlng.lng)
        this.setState({markers})

    }


    render() {
        return (
            <>
               <h4><FontAwesomeIcon icon={faMapMarkerAlt}/> Select the place on the map to see its current weather</h4>
                <Map
                center={[localStorage.getItem('lat'), localStorage.getItem('lon')]}
                onClick={this.addMarker}
                zoom={13}
                className={style.leaflet_container}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {this.props.markers.map((marker, index) =>

                    <Marker key={index} position={marker.latlng}
                            icon={new divIcon({
                                html: renderToStaticMarkup(<div className={style.marker}>
                                    <img
                                        src={`http://openweathermap.org/img/wn/${marker.icon}@2x.png`}
                                        className={style.img}
                                        alt='marker'/>
                                    <p className={style.temp}>
                                        {marker.temp} {this.props.units === 'metric' ? '°C' : 'F'}</p>
                                </div>),
                            })}>
                    </Marker>
                )}
            </Map>
                </>

        )
    }
}

let mapStateToProps = (state) => {
    return {
        markers: state.MapReducer.markers,
        units: state.CurrentReducer.units
    }
}


export default connect(mapStateToProps, {setMarker})(WeatherMap)
