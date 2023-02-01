import React, { useRef, useState, useEffect } from 'react';
import L from 'leaflet';

const MapPicker = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    mapRef.current = L.map('map').setView([-33.4488897, -70.6692655], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapRef.current);

    markerRef.current = L.marker([51.5, -0.09], {
      draggable: true
    }).addTo(mapRef.current);

    markerRef.current.on('dragend', event => {
      setSelectedLocation(event.target.getLatLng());
    });
  }, []);

  return (
    <div>
      <div id="map" style={{ height: '500px', width: '100%' }} />
      {selectedLocation && (
        <p>
          Latitude: {selectedLocation.lat}, Longitude: {selectedLocation.lng}
        </p>
      )}
    </div>
  );
};

export default MapPicker;
