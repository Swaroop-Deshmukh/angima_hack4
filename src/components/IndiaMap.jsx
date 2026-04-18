import React, { useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapFlyTo({ center, zoom }) {
  const map = useMap();
  React.useEffect(() => {
    map.flyTo(center, zoom, { duration: 0.8 });
  }, [map, center, zoom]);
  return null;
}

const LAYER_ORDER = ['population', 'literacy', 'infra', 'gdp'];

function pickPrimaryLayer(activeIds) {
  for (const id of LAYER_ORDER) {
    if (activeIds.has(id)) return id;
  }
  return null;
}

function styleForFeature(f, primary) {
  if (f.paradox) {
    return { color: '#dc2626', fill: '#dc2626', radius: 16, weight: 3 };
  }
  switch (primary) {
    case 'population':
      return { color: '#2563eb', fill: '#2563eb', radius: 8 + Math.min(24, (f.popDensity || 0) / 20), weight: 2 };
    case 'literacy':
      return { color: '#16a34a', fill: '#16a34a', radius: 10 + (f.literacy || 0) / 4, weight: 2 };
    case 'infra':
      return { color: '#ea580c', fill: '#ea580c', radius: 10 + (f.infraGap || 0) / 3.5, weight: 2 };
    case 'gdp':
      return { color: '#c39c5b', fill: '#c39c5b', radius: 10 + (f.gdpContrib || 0) * 1.4, weight: 2 };
    default:
      return { color: '#0f2b5b', fill: '#0f2b5b', radius: 14, weight: 2 };
  }
}

export default function IndiaMap({
  features,
  layers,
  focus,
  className = '',
  tileOpacity = 1,
  mapClassName = '',
}) {
  const center = focus?.center ?? [22.5, 79];
  const zoom = focus?.zoom ?? 5;

  const activeIds = useMemo(() => new Set(layers.filter((l) => l.on).map((l) => l.id)), [layers]);
  const primary = pickPrimaryLayer(activeIds);

  return (
    <div className={`india-map-3d-wrap ${className}`}>
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        className={`india-map ${mapClassName}`}
        scrollWheelZoom
        style={{ height: '100%', width: '100%', minHeight: 420 }}
      >
        <MapFlyTo center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={tileOpacity}
        />
        {features.map((f) => {
          const s = styleForFeature(f, primary);
          return (
            <CircleMarker
              key={f.id}
              center={[f.lat, f.lng]}
              pathOptions={{
                color: s.color,
                fillColor: s.fill,
                fillOpacity: 0.38,
                weight: s.weight,
              }}
              radius={s.radius}
            >
              <Tooltip direction="top" offset={[0, -6]} opacity={0.95}>
                <div style={{ fontSize: 12, maxWidth: 240 }}>
                  <strong>{f.name}</strong>
                  {f.level ? <div style={{ opacity: 0.85 }}>Level: {f.level}</div> : null}
                  <div>Population density: {f.popDensity ?? '—'}</div>
                  <div>Literacy %: {f.literacy ?? '—'}</div>
                  <div>Infra gap index: {f.infraGap ?? '—'}</div>
                  <div>GDP contribution %: {f.gdpContrib ?? '—'}</div>
                  {f.paradox ? <div style={{ color: '#b91c1c', fontWeight: 600 }}>Resource–GDP paradox — reinvestment strategy</div> : null}
                  {primary ? <div style={{ marginTop: 6, fontSize: 11 }}>Active layer: {primary}</div> : null}
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
