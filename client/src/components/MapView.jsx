import React from 'react';
import axios from 'axios';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import config from '../../../config'

// const dotenv = require('dotenv').config();

const Map = ReactMapboxGl({
    accessToken: config.pubKey
});

class MapView extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                    height: "50vh",
                    width: "50vw",
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                <Layer
                    type="symbol"
                    id="marker"
                    layout={{ "icon-image": "marker-15" }}>
                    <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                </Layer>
            </Map>
        );
    }
}

export default MapView;