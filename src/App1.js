import React, { useState, useEffect, Component} from "react";
import ReactDOM from 'react-dom';
import ReactMapGL, { Marker, Popup, GeolocateControl} from "react-map-gl";
import * as resdata from "./data/resource_data_formatted.json";

//Get user input of zipcode OR Click and zoom to radius around that
//Set viewport to that zipcode

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 39.8283,
    longitude: -98.5795,
    width: "50vw",
    height: "50vh",
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
            +
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
            <div>
              res
              <h1>{selectedRes.properties.id}</h1>
              <h2>{selectedRes.properties.name}</h2>
              <p>{selectedRes.properties.location}</p>
              <p>{selectedRes.properties.contact}</p>
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
