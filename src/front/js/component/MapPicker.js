import React, { useRef, useState, useEffect } from 'react';
import L from 'leaflet';

const MapPicker = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    mapRef.current = L.map('map', {
      center: [-33.43702826675353, -70.6344509124756],
      zoom: 14
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapRef.current);

    markerRef.current = L.marker([-33.43702826675353, -70.6344509124756], {
      draggable: true
    }).addTo(mapRef.current);

    markerRef.current.on('dragend', event => {
      setSelectedLocation(event.target.getLatLng());
    });
  }, []);

  return (
    <div>
      <div id="map" className='mx-auto' style={{ height: '300px', width: '95%', imageRendering: 'crisp-edges', maxHeight: 'none', maxWidth: 'none' }} />
      {selectedLocation && (
        <p className='text-center'>
          Latitude: {selectedLocation.lat}, Longitude: {selectedLocation.lng}
        </p>
      )}
    </div>
  );
};

export default MapPicker;
