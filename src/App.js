import React, { useState, useEffect, Component} from "react";
import ReactDOM from 'react-dom';
import ReactMapGL, { Marker, Popup, GeolocateControl} from "react-map-gl";
import * as resdata from "./data/resource_data_formatted.json";
import location from './location.svg';
import './App.css';

//Get user input of zipcode OR Click and zoom to radius around that
//Set viewport to that zipcode

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 39.8283,
    longitude: -98.5795,
    width: "100vw",
    height: "100vh",
    zoom: 2
  });

  const [selectedRes, setSelectedRes] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedRes(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  // class ZipForm extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {value: ''};

  //     this.handleChange = this.handleChange.bind(this);
  //     this.handleSubmit = this.handleSubmit.bind(this);
  //   }

  //   handleChange(event) {
  //     this.setState({value: event.target.value});
  //   }

  //   handleSubmit(event) {
  //     alert('A zipcode was submitted: ' + this.state.value);
  //     event.preventDefault();
  //   }

  //   render() {
  //     return (
  //       <form onSubmit={this.handleSubmit}>
  //         <label>
  //           Zip Code:
  //           <input type="text" value={this.state.value} onChange={this.handleChange} />
  //         </label>
  //         <input type="submit" value="Submit" />
  //       </form>
  //     );
  //   }
  // }




  return (

    <div>
    <ReactMapGL
     {...viewport}
     mapboxApiAccessToken={"pk.eyJ1IjoibGF1cmVubWNtNzQ5IiwiYSI6ImNrY244bDRpOTA4dG0yd3Jxc2pmMjlyZzQifQ.SXZTv0RDz6Jck-ZlWxB0Mg"}
     onViewportChange = {(viewport) => {
      setViewport(viewport);
     }
    }
    >
     {resdata.features.map(res => (
          <Marker
            key={res.properties.id}
            latitude={res.geometry.coordinates[0]}
            longitude={res.geometry.coordinates[1]}
          >
            <div>

            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedRes(res);
              }}
            >
            <svg id="location" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            </button>
            </div>
          </Marker>
     )) }

       {selectedRes ? (
          <Popup
            latitude={selectedRes.geometry.coordinates[0]}
            longitude={selectedRes.geometry.coordinates[1]}
            onClose={() => {
              setSelectedRes(null);
            }}
          >
            <div className="map-popup">
              <h3>{selectedRes.properties.name}</h3>
              <div className="info-div">
              <div className="label-row">
                <p className="label">Address: </p>
                <p>{selectedRes.properties.location}</p>
              </div>
              <div className="label-row">
                <p className="label">Contact: </p>
                <p>{selectedRes.properties.contact}</p>
            </div>
              </div>
            </div>
          </Popup>
        ) : null}

  </ReactMapGL>


  {/* ReactDOM.render( */}
    {/* <div>
      <ZipForm />
    </div> */}
      {/* document.getElementById('root')
    ); */}

    </div>





  );



}
