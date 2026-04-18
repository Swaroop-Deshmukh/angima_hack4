import React from 'react';
import { MapContainer, TileLayer, Circle, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapReset({ center, zoom }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
}

export default function CulturalFabricMap({ zones, className = '' }) {
  return (
    <div className={`cultural-fabric-map ${className}`}>
      <MapContainer
        center={[21.2, 81.2]}
        zoom={6}
        className="india-map cultural-map-inner"
        scrollWheelZoom
        style={{ height: '100%', width: '100%', minHeight: 320 }}
      >
        <MapReset center={[21.2, 81.2]} zoom={6} />
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={0.55}
        />
        {zones.map((z) => (
          <Circle
            key={z.id}
            center={[z.lat, z.lng]}
            pathOptions={{
              color: z.heritage ? '#15803d' : '#78716c',
              fillColor: z.heritage ? '#22c55e' : '#a8a29e',
              fillOpacity: 0.12 + z.resistance * 0.25,
              weight: 2,
            }}
            radius={9000 + z.resistance * 12000}
          >
            <Tooltip direction="top" opacity={0.95}>
              <div style={{ fontSize: 12, maxWidth: 260 }}>
                <strong>{z.name}</strong>
                <div>Resistance index: {(z.resistance * 100).toFixed(0)} / 100</div>
                <div>Forest cover (synthetic %): {z.forestPct}</div>
                {z.heritage ? <div>Heritage / tribal safeguards: active</div> : null}
              </div>
            </Tooltip>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
}
