'use client'

//Map component Component from library
import { GoogleMap, Marker } from "@react-google-maps/api";
import { MapProvider } from "./ContactMap";
import { useCallback, useState } from "react";

//Map's styling
export const defaultMapContainerStyle = {
    width: '100%',
    height: '80vh',
    borderRadius: '15px 0px 0px 15px',
};

const center = {
    lat: 37.7749,  // Enlem (örneğin San Francisco)
    lng: -122.4194, // Boylam
  };

const MapComponent = () => {
    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map: any) {
      const bounds = new window.google.maps.LatLngBounds();
      map.fitBounds(bounds);
      setMap(map);
    }, []);
  
    const onUnmount = useCallback(function callback(map: any) {
      setMap(null);
    }, []);
  
    return (
      <MapProvider>
        <GoogleMap
          mapContainerStyle={defaultMapContainerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={center} />
        </GoogleMap>
      </MapProvider>
    );
  }

export { MapComponent };