import React, { useState, useEffect, Component} from "react";
import ReactDOM from 'react-dom';
import ReactMapGL, { Marker, Popup, GeolocateControl} from "react-map-gl";
import * as resdata from "./data/resource_data.json";

class Map extends Component {
    constructor(props) {
      super(props);
      this.state = {
        viewport: {
          width: 800,
          height: 600,
          longitude: -122.45,
          latitude: 37.78,
          zoom: 14
        }
      }
    }
    
  
    render() {
      const {viewport} = this.state;
      return (
        <ReactMapGL {...viewport} onViewportChange={updateViewport}>
          <div style={{ position: "absolute", right: 0 }}>
            <GeolocateControl 
              positionOptions={{enableHighAccuracy: true}}
              trackUserLocation={true}
              onViewportChange={this._updateViewport}
            />
          </div>
        </ReactMapGL>
      );
    }
  }

  