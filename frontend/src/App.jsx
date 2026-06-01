import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function ClickHandler({ source, destination, setSource, setDestination }) {
  useMapEvents({
    click(e) {
      const point = [e.latlng.lat, e.latlng.lng];

      if (!source) {
        setSource(point);
      } else if (!destination) {
        setDestination(point);
      } else {
        setSource(point);
        setDestination(null);
      }
    },
  });

  return null;
}

function App() {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);

  return (
    <div>
      <h1>SafeRoute</h1>

      <MapContainer
        center={[15.335, 76.461]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <ClickHandler
          source={source}
          destination={destination}
          setSource={setSource}
          setDestination={setDestination}
        />

        {source && (
          <Marker position={source}>
            <Popup>Source</Popup>
          </Marker>
        )}

        {destination && (
          <Marker position={destination}>
            <Popup>Destination</Popup>
          </Marker>
        )}

        {source && destination && (
          <Polyline
            positions={[
              [source[0], source[1]],
              [destination[0], destination[1]]
            ]}
            pathOptions={{ color: "red", weight: 6 }}
          />
        )}
      </MapContainer>

      <br />

      {source && (
        <p>
          Source: {source[0].toFixed(5)}, {source[1].toFixed(5)}
        </p>
      )}

      {destination && (
        <p>
          Destination: {destination[0].toFixed(5)}, {destination[1].toFixed(5)}
        </p>
      )}
    </div>
  );
}

export default App;