/* eslint-disable react/no-unused-state */
import React from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import config from '../../../config';

mapboxgl.accessToken = 'pk.eyJ1IjoiY3NrbGFkeiIsImEiOiJjanNkaDZvMGkwNnFmNDRuczA1cnkwYzBlIn0.707UUYmzztGHU2aVoZAq4g';

class MapView extends React.Component {
  constructor(props) {
    super(props);
    // create state that is set to the plant's adress
    this.state = {
      address: [],
    };
    this.getAddress = this.getAddress.bind(this);
  }

  componentDidMount() {
    // add destination property to directions? to render map with plant's address as destination
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-90.5795, 29.8283],
      zoom: 13,
    });
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/walking',
    });
    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(6),
        lat: lat.toFixed(6),
        zoom: map.getZoom().toFixed(2),
      });
    });
    map.addControl(directions, 'top-left');
    directions.setOrigin([-90.069800, 29.972890]);
    directions.setDestination([-90.5795, 29.8283]);
    this.getAddress();
  }

  getAddress() {
    axios.get('/health')
      .then((res) => {
        // console.log(res);
        const plant = res.data;
        this.setState({ address: plant.address });
      });
  }


  render() {
    return (
      <div>
        <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.0.0/mapbox-gl-directions.js" />
        <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.0.0/mapbox-gl-directions.css" type="text/css" />
        <div
          id="map"
          style={{
            width: 600,
            height: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
      </div>
    );
  }
}

export default MapView;
